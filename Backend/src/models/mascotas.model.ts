import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IMascota } from "../types/IMascota";
import { ResultSetHeader } from "mysql2";
import { IHistorialClinicoDTO } from "../types/IHistorialClinico";

export type MascotaRow = IMascota & RowDataPacket;

export const findAllMascotas = async (): Promise<IMascota[]> => {
  const [rows] = await pool.query<MascotaRow[]>("SELECT * FROM MASCOTAS");
  return rows;
};

export const findMascotaById = async (id: string): Promise<IMascota | null> => {
  const [rows] = await pool.query<MascotaRow[]>(
    "SELECT * FROM MASCOTAS WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const findMascotaByHistorialId = async (
  historialId: string,
): Promise<string | null> => {
  const [rows] = await pool.query<MascotaRow[]>(
    `SELECT id_mascota FROM historial_clinico where id = ?`,
    [historialId],
  );
  return rows.length ? rows[0].id_mascota : null;
};

export const createMascota = async (
  mascota: Omit<IHistorialClinicoDTO, "id">,
  duenioId: string,
): Promise<number> => {
  const [MascotaResult] = await pool.query(
    "INSERT INTO MASCOTAS (id_dueno, nombre, especie, estado, edad ) VALUES (?,?,?,?,?)",
    [
      duenioId,
      mascota.mascotaNombre,
      mascota.mascotaEspecie,
      1,
      mascota.mascotaEdad,
    ],
  );
  return (MascotaResult as any).insertId;
};

export const updateMascota = async (
  id: string,
  mascota: IHistorialClinicoDTO,
): Promise<IMascota | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE MASCOTAS
     SET nombre = ?, especie = ?, estado = ?, edad = ?
     WHERE id = ?`,
    [mascota.mascotaNombre, mascota.mascotaEspecie, 1, mascota.mascotaEdad, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar la mascota actualizada
  const [rows] = await pool.query<MascotaRow[]>(
    "SELECT * FROM MASCOTAS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteMascota = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE MASCOTAS SET estado = 0 WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
