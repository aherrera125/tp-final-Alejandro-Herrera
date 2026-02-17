import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { IVeterinario } from "../types/IVeterinario";
import { IUsuario } from "../types/IUsuario";
import { PoolConnection } from "mysql2/promise";

export const getConnection = async (): Promise<PoolConnection> => {
  return pool.getConnection();
};

export type UserRow = IUsuario & RowDataPacket;

export const findUser = async (
  email: string = "",
  username: string = "",
): Promise<IUsuario | null> => {
  const [rows] = await pool.query<UserRow[]>(
    `SELECT u.*, r.name as role 
     FROM users u 
     LEFT JOIN user_roles ur ON u.id = ur.user_id 
     LEFT JOIN roles r ON ur.role_id = r.id 
     WHERE u.email = ? OR u.username = ? LIMIT 1`,
    [email, username],
  );

  return rows.length ? rows[0] : null;
};

export const createUser = async (
  user: Omit<IUsuario, "id" | "role">,
): Promise<number> => {
  const [userResult] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [user.username, user.email, user.password],
  );

  return (userResult as any).insertId;
};

export const createVeterinario = async (
  veterinario: Omit<IVeterinario, "id">,
): Promise<number> => {
  const [veterinarioResult] = await pool.query(
    "INSERT INTO VETERINARIOS (nombre, apellido, matricula, especialidad, user_id) VALUES (?,?,?,?,?)",
    [
      veterinario.nombre,
      veterinario.apellido,
      veterinario.matricula,
      veterinario.especialidad,
      veterinario.userid,
    ],
  );

  return (veterinarioResult as any).insertId;
};

export const createUserRole = async (
  userId: number,
  roleId: number,
): Promise<number> => {
  const [userResult] = await pool.query(
    "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
    [userId, roleId],
  );

  return (userResult as any).insertId;
};
