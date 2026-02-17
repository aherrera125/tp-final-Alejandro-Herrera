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
    `SELECT ma.id, ma.nombre, ma.especie, ma.fecha_nacimiento, 
     vt.id, vt.nombre, vt.apellido, vt.matricula, vt.especialidad
     FROM historial_clinico hc 
     INNER JOIN mascotas ma on ma.id = hc.id_mascota
     INNER JOIN veterinarios ve ON ve.id = hc.id_veterinario 
     INNER JOIN users us ON us.id = ve.user_id 
     WHERE us.id = ?`,
    [userId],
  );
  return rows.length ? rows[0] : null;
};

export const createHistorialClinico = async (
  userId: string,
  historialClinico: Omit<IHistorialClinico, "id" | "id_veterinario">,
): Promise<number> => {
  const [veterinarioIdRows]: any = await pool.query(
    `SELECT vt.id 
     FROM veterinarios vt
     INNER JOIN users us ON us.id = vt.user_id
     WHERE us.id = ?`,
    [userId],
  );

  if (!veterinarioIdRows || veterinarioIdRows.length === 0) {
    throw new Error("Veterinario no encontrado para el usuario");
  }

  const veterinarioId = veterinarioIdRows[0].id;

  if (!historialClinico.id_mascota || !historialClinico.descripcion) {
    throw new Error("Faltan datos obligatorios para crear historial clínico");
  }

  const { id_mascota, descripcion } = historialClinico;

  const [historialClinicoResult] = await pool.query(
    `INSERT INTO HISTORIAL_CLINICO (id_mascota, id_veterinario, descripcion) 
     VALUES (?,?,?)`,
    [id_mascota, veterinarioId, descripcion],
  );
  return (historialClinicoResult as any).insertId;
};

export const updateHistorialClinico = async (
  id: string,
  historialClinico: IHistorialClinico,
): Promise<IHistorialClinico | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE HISTORIAL_CLINICO
     SET id_mascota = ?, id_veterinario = ?, fecha_registro = ?, descripcion = ?
     WHERE id = ?`,
    [
      historialClinico.id_mascota,
      historialClinico.id_veterinario,
      historialClinico.fecha_registro,
      historialClinico.descripcion,
      id,
    ],
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
    "DELETE FROM HISTORIAL_CLINICO WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
