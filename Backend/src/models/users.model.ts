import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IUsuario } from "../types/IUsuario";
import { ResultSetHeader } from "mysql2";

export type UsuarioRow = IUsuario & RowDataPacket;

export const findAllUsers = async (): Promise<IUsuario[]> => {
  const [rows] = await pool.query<UsuarioRow[]>("SELECT * FROM USERS");
  return rows;
};

export const findUserById = async (id: string): Promise<IUsuario | null> => {
  const [rows] = await pool.query<UsuarioRow[]>(
    "SELECT * FROM USERS WHERE id = ?",
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const createUser = async (
  usuario: Omit<IUsuario, "id">,
): Promise<number> => {
  const [usuarioResult] = await pool.query(
    `INSERT INTO USERS (username, email, password, nombre, apellido, matricula, especialidad) 
     VALUES (?,?,?,?,?,?,?)`,
    [
      usuario.username,
      usuario.email,
      usuario.password,
      usuario.nombre,
      usuario.apellido,
      usuario.matricula,
      usuario.especialidad,
    ],
  );
  return (usuarioResult as any).insertId;
};

export const updateUser = async (
  id: string,
  usuario: IUsuario,
): Promise<IUsuario | null> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE USERS
     SET nombre = ?, apellido = ?, matricula = ?, especialidad = ?
     WHERE id = ?`,
    [
      usuario.nombre,
      usuario.apellido,
      usuario.matricula,
      usuario.especialidad,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar la usuario actualizada
  const [rows] = await pool.query<UsuarioRow[]>(
    "SELECT * FROM USERS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM USERS WHERE id = ?",
    [id],
  );
  return result.affectedRows > 0;
};
