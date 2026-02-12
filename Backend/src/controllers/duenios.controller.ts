import { Request, Response } from "express";
import { IDuenio } from "../types/IDuenio";
import * as dueniosService from "../services/duenios.service";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const duenioData = await dueniosService.getAllDuenios();
    return res.status(200).json({ duenioData });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener los duenños.` });
  }
};

//getById
export const getById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const duenioData = await dueniosService.getDuenioById(id);
    if (!duenioData) {
      return res.status(404).json({ message: "Dueño no encontrado." });
    }
    return res.status(200).json({ duenioData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el dueño con id ${id}.` });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    const duenioData: IDuenio = req.body;
    const duenioCreated = await dueniosService.addDuenio(duenioData);
    return res.status(201).json({ duenioCreated });
  } catch (error) {
    return res.status(500).json({ message: `Error al crear el dueño.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const duenioData: IDuenio = req.body;
    const duenioUpdated = await dueniosService.editDuenio(id, duenioData);
    if (!duenioUpdated) {
      return res.status(404).json({ message: `Dueño no encontrado.` });
    }
    return res.status(200).json({
      duenioUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del dueño.` });
  }
};
//delete()
export const delet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const duenioDeleted = await dueniosService.removeDuenio(id);
    if (!duenioDeleted) {
      res.status(404).json({ message: `Dueño no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Dueño con id ${id} se eliminaros exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar el Dueño.` });
  }
};
