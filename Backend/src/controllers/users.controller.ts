import { Request, Response } from "express";
import { IUsuario } from "../types/IUsuario";
import * as usersService from "../services/users.service";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const usuarioData = await usersService.getAllVeterinarios();
    return res.status(200).json({ usuarioData });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener los usuarios.` });
  }
};

//getById
export const getById = async (req: Request, res: Response) => {
  const userId = req.user!.id.toString(); // 👈 SALE DEL TOKEN
  try {
    const usuarioData = await usersService.getVeterinarioById(userId);
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
    const usuarioCreated = await usersService.addVeterinario(usuarioData);
    return res.status(201).json({ usuarioCreated });
  } catch (error) {
    return res.status(500).json({ message: `Error al crear el usuario.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuarioData: IUsuario = req.body;
    const usuarioUpdated = await usersService.editVeterinario(id, usuarioData);
    if (!usuarioUpdated) {
      return res.status(404).json({ message: `Veterinario no encontrado.` });
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
  try {
    const { id } = req.params;
    const usuarioDeleted = await usersService.removeVeterinario(id);
    if (!usuarioDeleted) {
      res.status(404).json({ message: `Veterinario no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Veterinario con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el usuario.` });
  }
};
