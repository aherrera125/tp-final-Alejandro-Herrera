import { Request, Response } from "express";
import * as rolesService from "../services/roles.service";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const rolesData = await rolesService.getAllRoles();
    return res.status(200).json({ rolesData });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener los roles.` });
  }
};
