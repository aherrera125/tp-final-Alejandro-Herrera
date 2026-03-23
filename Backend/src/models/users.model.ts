import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IUsuario } from "../types/IUsuario";
import { ResultSetHeader } from "mysql2";

export type UsuarioRow = IUsuario & RowDataPacket;

export const findAllUsers = async (): Promise<IUsuario[]> => {
  const [rows] = await pool.query<UsuarioRow[]>(
    `SELECT us.nombre, 
	    us.apellido, 
      us.email,
      us.username,
      us.especialidad,
      us.matricula,
      us.status,
      ro.name
    FROM USERS us
    INNER JOIN USER_ROLES ur on ur.user_id = us.id
    INNER JOIN ROLES ro on ro.id = ur.role_id
    ORDER BY US.id DESC`,
  );
  return rows;
};

export const findUserById = async (id: string): Promise<IUsuario | null> => {
  const [rows] = await pool.query<UsuarioRow[]>(
    `SELECT us.username, ro.name rolename, us.status FROM USERS us
    INNER JOIN user_roles ur on ur.user_id = us.id
    INNER join roles ro on ro.id = ur.role_id
    WHERE us.id =?`,
    [id],
  );
  return rows.length ? rows[0] : null;
};

export const findUserByEmail = async (
  email: string,
): Promise<IUsuario | null> => {
  const [rows] = await pool.query<UsuarioRow[]>(
    `SELECT u.*, r.name as role 
     FROM users u 
     JOIN user_roles ur ON u.id = ur.user_id 
     JOIN roles r ON ur.role_id = r.id 
     WHERE u.email = ?`,
    [email],
  );
  return rows.length ? rows[0] : null;
};

export const createUser = async (
  usuario: Omit<IUsuario, "id" | "status" | "role">,
): Promise<number> => {
  const [usuarioResult] = await pool.query(
    `INSERT INTO USERS (username, email, password, nombre, apellido, matricula, especialidad, status) 
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      usuario.username,
      usuario.email,
      usuario.password,
      usuario.nombre,
      usuario.apellido,
      usuario.matricula,
      usuario.especialidad,
      1,
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
     SET nombre = ?, apellido = ?, email = ?, matricula = ?, especialidad = ?
     WHERE id = ?`,
    [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.matricula,
      usuario.especialidad,
      id,
    ],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  // volver a buscar al usuario actualizada
  const [rows] = await pool.query<UsuarioRow[]>(
    "SELECT * FROM USERS WHERE id = ?",
    [id],
  );

  return rows[0];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE USERS
     SET status = 0
     WHERE id = ?`,
    [id],
  );
  return result.affectedRows > 0;
};

export const createUserRole = async (
  userId: number,
  roleId: string,
): Promise<void> => {
  console.log("auth.model: insert del rol del usuario");
  await pool.query(`INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`, [
    userId,
    roleId,
  ]);
};
