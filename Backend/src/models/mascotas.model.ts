import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IMascota } from "../types/IMascota";
import { ResultSetHeader } from "mysql2";

export type MascotaRow = IMascota & RowDataPacket;

export const findAllMascotas = async (): Promise<IMascota[]> => {
  const [rows] = await pool.query<MascotaRow[]>("SELECT * FROM MASCOTAS");
  return rows;
};

export const findMascotaById = async (id: string): Promise<IMascota | null> => {
  const [rows] = await pool.query<MascotaRow[]>(
    "SELECT * FROM MASCOTAS MA WHERE MA.id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createMascota = async (
  mascota: Omit<IMascota, "id">,
): Promise<number> => {
  const [MascotaResult] = await pool.query(
    "INSERT INTO MASCOTAS (id_dueno, nombre, especie, fecha_nacimiento ) VALUES (?,?,?,?)",
    [
      mascota.id_duenio,
      mascota.nombre,
      mascota.especie,
      mascota.fecha_nacimiento,
    ],
  );
  return (MascotaResult as any).insertId;
};

export const updateMascota = async (
  id: string,
  mascota: IMascota,
): Promise<IMascota | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE MASCOTAS
     SET id_dueno = ?, nombre = ?, especie = ?, fecha_nacimiento = ?
     WHERE id = ?`,
    [
      mascota.id_duenio,
      mascota.nombre,
      mascota.especie,
      mascota.fecha_nacimiento,
      id,
    ],
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
    "DELETE FROM MASCOTAS WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
