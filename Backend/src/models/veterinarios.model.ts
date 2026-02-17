import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IVeterinario } from "../types/IVeterinario";
import { ResultSetHeader } from "mysql2";
import { MascotaRow } from "./mascotas.model";

export type VeterinarioRow = IVeterinario & RowDataPacket;

export const findAllVeterinarios = async (): Promise<IVeterinario[]> => {
  const [rows] = await pool.query<VeterinarioRow[]>(
    "SELECT * FROM VETERINARIOS",
  );
  return rows;
};

export const findVeterinarioByUserId = async (
  user_id: string,
): Promise<IVeterinario | null> => {
  const [rows] = await pool.query<VeterinarioRow[]>(
    "SELECT * FROM VETERINARIOS WHERE user_id = ?",
    [user_id],
  );
  return rows.length ? rows[0] : null;
};
export const findVeterinarioById = async (
  id: string,
): Promise<IVeterinario | null> => {
  const [rows] = await pool.query<VeterinarioRow[]>(
    "SELECT * FROM VETERINARIOS WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createVeterinario = async (
  veterinario: Omit<IVeterinario, "id">,
): Promise<number> => {
  const [veterinarioResult] = await pool.query(
    "INSERT INTO VETERINARIOS (nombre, apellido, matricula, especialidad) VALUES (?,?,?,?)",
    [
      veterinario.nombre,
      veterinario.apellido,
      veterinario.matricula,
      veterinario.especialidad,
    ],
  );
  return (veterinarioResult as any).insertId;
};

export const updateVeterinario = async (
  id: string,
  veterinario: IVeterinario,
): Promise<IVeterinario | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE VETERINARIOS
     SET nombre = ?, apellido = ?, matricula = ?, especialidad = ?
     WHERE id = ?`,
    [
      veterinario.nombre,
      veterinario.apellido,
      veterinario.matricula,
      veterinario.especialidad,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar la veterinario actualizada
  const [rows] = await pool.query<VeterinarioRow[]>(
    "SELECT * FROM VETERINARIOS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteVeterinario = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM VETERINARIOS WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
