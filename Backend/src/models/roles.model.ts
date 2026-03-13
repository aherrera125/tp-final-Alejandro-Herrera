import pool from "../database/mysql";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";
import { IRol } from "../types/IRol";

export type RolRow = IRol & RowDataPacket;

export const findAllRoles = async (): Promise<RolRow[]> => {
  const [rows] = await pool.query<RolRow[]>("SELECT * FROM roles");
  return rows;
};
