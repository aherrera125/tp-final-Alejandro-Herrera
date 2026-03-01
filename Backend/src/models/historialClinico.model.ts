import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import {
  IHistorialClinico,
  IHistorialClinicoDTO,
} from "../types/IHistorialClinico";
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
    `SELECT ma.id mascotaId,
	          ma.nombre mascotaNombre, 
	          ma.especie mascotaEspecie, 
            ma.edad mascotaEdad, 
            du.id duenioId,
            du.nombre duenioNombre,
            du.apellido duenioApellido,
            du.telefono, 
            du.direccion,
            hc.id historiaId,
            hc.descripcion 
    FROM HISTORIAL_CLINICO hc
    INNER JOIN mascotas ma on ma.id = hc.id_mascota
    INNER JOIN duenos du on du.id = ma.id_dueno
    WHERE hc.id =  ?`,
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const findHistorialClinicoByUserId = async (
  userId: string,
): Promise<IHistorialClinico[]> => {
  const [rows] = await pool.query<HistorialClinicoRow[]>(
    `SELECT hc.id historialId,            
            DATE_FORMAT(CONVERT_TZ(fecha_registro, '+00:00', '+00:00'), '%d/%m/%Y') 
            AS fecha_registro,
            ma.id AS id_mascota,
            ma.nombre AS nom_mascota,
            ma.edad AS edad_mascota,
            ma.especie AS especie,
            d.id AS id_duenio,
            d.nombre AS nom_duenio, 
            d.apellido AS ape_duenio,
            d.telefono
     FROM historial_clinico hc 
     INNER JOIN users us ON us.id = hc.id_user
     INNER JOIN mascotas ma ON ma.id = hc.id_mascota
     INNER JOIN duenos d ON d.id = ma.id_dueno
     WHERE us.id = ? AND hc.status = 1`,
    [userId],
  );
  return rows;
};

export const createHistorialClinico = async (
  userId: string,
  mascotaId: number,
  historialClinico: Omit<IHistorialClinicoDTO, "id">,
): Promise<number> => {
  if (!mascotaId || !historialClinico.historial) {
    throw new Error("Faltan datos obligatorios para crear historial clínico");
  }

  try {
    const [historialClinicoResult] = await pool.query(
      `INSERT INTO HISTORIAL_CLINICO (id_mascota, descripcion, status, id_user) 
       VALUES (?,?,?,?)`,
      [mascotaId, historialClinico.historial, 1, userId],
    );
    return (historialClinicoResult as any).insertId;
  } catch (error) {
    console.error("Error in createHistorialClinico query:", error);
    throw error;
  }
};

export const updateHistorialClinico = async (
  id: string,
  historialClinico: IHistorialClinicoDTO,
): Promise<IHistorialClinico | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE HISTORIAL_CLINICO
     SET descripcion = ?
     WHERE id = ?`,
    [historialClinico.historial, id],
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
