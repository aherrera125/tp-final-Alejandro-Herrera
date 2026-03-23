import { Request, Response, NextFunction } from "express";
import pool from "../database/mysql";

export const authorizePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }

    const [rows] = await pool.query<any[]>(
      `
      SELECT 1
      FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.id
      JOIN user_roles ur ON ur.role_id = rp.role_id
      WHERE ur.user_id = ? AND p.action = ?
      LIMIT 1
      `,
      [req.user.id, permission],
    );

    if (rows.length === 0) {
      return res.status(403).json({
        message: "Permiso denegado",
        permission,
      });
    }
    next();
  };
};
