import { Request, Response } from "express";
import { IVeterinario } from "../types/IVeterinario";
import * as veterinariosService from "../services/veterinarios.service";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const veterinarioData = await veterinariosService.getAllVeterinarios();
    return res.status(200).json({ veterinarioData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener los veterinarios.` });
  }
};

//getById
export const getById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const veterinarioData = await veterinariosService.getVeterinarioById(id);
    if (!veterinarioData) {
      return res.status(404).json({ message: "Veterinario no encontrado." });
    }
    return res.status(200).json({ veterinarioData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el veterinario con id ${id}.` });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    const veterinarioData: IVeterinario = req.body;
    const veterinarioCreated =
      await veterinariosService.addVeterinario(veterinarioData);
    return res.status(201).json({ veterinarioCreated });
  } catch (error) {
    return res.status(500).json({ message: `Error al crear el veterinario.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const veterinarioData: IVeterinario = req.body;
    const veterinarioUpdated = await veterinariosService.editVeterinario(
      id,
      veterinarioData,
    );
    if (!veterinarioUpdated) {
      return res.status(404).json({ message: `Veterinario no encontrado.` });
    }
    return res.status(200).json({
      veterinarioUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos del veterinario.` });
  }
};
//delete()
export const delet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const veterinarioDeleted = await veterinariosService.removeVeterinario(id);
    if (!veterinarioDeleted) {
      res.status(404).json({ message: `Veterinario no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Veterinario con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al eliminar el veterinario.` });
  }
};
