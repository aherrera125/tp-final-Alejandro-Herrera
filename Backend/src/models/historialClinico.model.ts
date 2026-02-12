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

export const createHistorialClinico = async (
  historialClinico: Omit<IHistorialClinico, "id">,
): Promise<number> => {
  const [historialClinicoResult] = await pool.query(
    "INSERT INTO HISTORIAL_CLINICO (id_mascota, id_veterinario, fecha_registro, descripcion) VALUES (?,?,?,?)",
    [
      historialClinico.id_mascota,
      historialClinico.id_veterinario,
      historialClinico.fecha_registro,
      historialClinico.descripcion,
    ],
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
