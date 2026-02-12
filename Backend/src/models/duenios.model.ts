import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IDuenio } from "../types/IDuenio";
import { ResultSetHeader } from "mysql2";

export type DuenioRow = IDuenio & RowDataPacket;

export const findAllDuenios = async (): Promise<IDuenio[]> => {
  const [rows] = await pool.query<DuenioRow[]>("SELECT * FROM DUENOS");
  return rows;
};

export const findDuenio = async (id: string): Promise<IDuenio | null> => {
  const [rows] = await pool.query<DuenioRow[]>(
    "SELECT * FROM DUENOS DU WHERE DU.id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createDuenio = async (
  duenio: Omit<IDuenio, "id">,
): Promise<number> => {
  const [DuenioResult] = await pool.query(
    "INSERT INTO DUENOS (nombre, apellido, telefono, direccion) VALUES (?,?,?,?)",
    [duenio.nombre, duenio.apellido, duenio.telefono, duenio.direccion],
  );
  return (DuenioResult as any).insertId;
};

export const updateDuenio = async (
  id: string,
  duenio: IDuenio,
): Promise<IDuenio | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE DUENOS
     SET nombre = ?, apellido = ?, telefono = ?, direccion = ?
     WHERE id = ?`,
    [duenio.nombre, duenio.apellido, duenio.telefono, duenio.direccion, id],
  );

  if (result.affectedRows === 0) {
    return null; // no existía
  }

  // volver a buscar el dueño actualizado
  const [rows] = await pool.query<DuenioRow[]>(
    "SELECT * FROM DUENOS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteDuenio = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM DUENOS WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
