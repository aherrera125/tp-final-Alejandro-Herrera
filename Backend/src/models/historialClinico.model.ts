import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IHistorialClinico } from "../types/IHistorialClinico";
import { ResultSetHeader } from "mysql2";

export type HistorialClinicoRow = IHistorialClinico & RowDataPacket;

export const findAllHistorialClinico = async (): Promise<
  IHistorialClinico[]
> => {
  const [rows] = await pool.query<HistorialClinicoRow[]>(
    "SELECT * FROM HISTORIAL_CLINICO",
  );
  return rows;
};

export const findHistorialClinicoById = async (
  id: string,
): Promise<IHistorialClinico | null> => {
  const [rows] = await pool.query<HistorialClinicoRow[]>(
    "SELECT * FROM HISTORIAL_CLINICO WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const findHistorialClinicoByUserId = async (
  userId: string,
): Promise<IHistorialClinico | null> => {
  const [rows] = await pool.query<HistorialClinicoRow[]>(
    `SELECT ma.id, ma.nombre nom_mascota, ma.especie, ma.fecha_nacimiento, hc.fecha_registro, hc.descripcion,
     us.nombre nom_vete, us.apellido ape_vete
     FROM historial_clinico hc 
     inner join users us on us.id = hc.id_user
     INNER JOIN mascotas ma on ma.id = hc.id_mascota          
     WHERE us.id = ?`,
    [userId],
  );
  return rows.length ? rows[0] : null;
};

export const createHistorialClinico = async (
  userId: string,
  historialClinico: Omit<IHistorialClinico, "id">,
): Promise<number> => {
  const [historialIdRows]: any = await pool.query(
    `INSERT INTO historial_clinico(id_mascota, fecha_registro, descripcion, status, id_user) 
     VALUES (?,?,?,?,?)`,
    [
      historialClinico.id_mascota,
      historialClinico.fecha_registro,
      historialClinico.descripcion,
      1, // status por defecto en true
      userId,
    ],
  );

  if (!historialIdRows || historialIdRows.length === 0) {
    throw new Error("No se pudo crear el historial clínico");
  }

  const historialId = historialIdRows[0].insertId;

  if (!historialClinico.id_mascota || !historialClinico.descripcion) {
    throw new Error("Faltan datos obligatorios para crear historial clínico");
  }

  const { id_mascota, descripcion } = historialClinico;

  const [historialClinicoResult] = await pool.query(
    `INSERT INTO HISTORIAL_CLINICO (id_mascota, id_user, descripcion) 
     VALUES (?,?,?)`,
    [id_mascota, userId, descripcion],
  );
  return (historialClinicoResult as any).insertId;
};

export const updateHistorialClinico = async (
  id: string,
  historialClinico: IHistorialClinico,
): Promise<IHistorialClinico | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE HISTORIAL_CLINICO
     SET descripcion = ?
     WHERE id = ?`,
    [historialClinico.descripcion, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar el historial clinico actualizado
  const [rows] = await pool.query<HistorialClinicoRow[]>(
    "SELECT * FROM HISTORIAL_CLINICO WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteHistorialClinico = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE HISTORIAL_CLINICO SET status = 0 WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
