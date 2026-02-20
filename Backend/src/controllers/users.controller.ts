import { Request, Response } from "express";
import { IUsuario } from "../types/IUsuario";
import * as usersService from "../services/users.service";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const usuarioData = await usersService.getAllUsuarios();
    return res.status(200).json({ usuarioData });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener los usuarios.` });
  }
};

//getById
export const getById = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  if (!req.user.id) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  const userId = req.user.id.toString(); // 👈 SALE DEL TOKEN
  try {
    const usuarioData = await usersService.getUsuarioById(userId);
    if (!usuarioData) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json({ usuarioData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el usuario con id ${userId}.` });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    const usuarioData: IUsuario = req.body;
    const usuarioCreated = await usersService.addUsuario(usuarioData);
    return res.status(201).json({ usuarioCreated });
  } catch (error) {
    return res.status(500).json({ message: `Error al crear el usuario.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  if (!req.user.id) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  const userId = req.user.id.toString(); // 👈 SALE DEL TOKEN
  try {
    const usuarioData: IUsuario = req.body;
    const usuarioUpdated = await usersService.editUsuario(userId, usuarioData);
    if (!usuarioUpdated) {
      return res.status(404).json({ message: `Usuario no encontrado.` });
    }
    return res.status(200).json({
      usuarioUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del usuario.` });
  }
};
//delete()
export const delet = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  if (!req.user.id) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }
  try {
    const userId = req.user.id.toString();
    const usuarioDeleted = await usersService.removeUsuario(userId);
    if (!usuarioDeleted) {
      res.status(404).json({ message: `Usuario no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Usuario con id ${userId} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el usuario.` });
  }
};
