import { Request, Response } from "express";
import { IMascota } from "../types/IMascota";
import * as mascotasService from "../services/mascotas.service";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const mascotaData = await mascotasService.getAllMascotas();
    return res.status(200).json({ mascotaData });
  } catch (error) {
    return res.status(500).json({ message: `Error al obtener las mascotas.` });
  }
};

//getById
export const getById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const mascotaData = await mascotasService.getMascotaById(id);
    if (!mascotaData) {
      return res.status(404).json({ message: "Mascota no encontrada." });
    }
    return res.status(200).json({ mascotaData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener la mascota con id ${id}.` });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    const mascotaData: IMascota = req.body;
    const mascotaCreated = await mascotasService.addMascota(mascotaData);
    return res.status(201).json({ mascotaCreated });
  } catch (error) {
    return res.status(500).json({ message: `Error al crear la mascota.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const mascotaData: IMascota = req.body;
    const mascotaUpdated = await mascotasService.editMascota(id, mascotaData);
    if (!mascotaUpdated) {
      return res.status(404).json({ message: `Mascota no encontrada.` });
    }
    return res.status(200).json({
      mascotaUpdated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al actualizar los datos de la mascota.` });
  }
};
//delete()
export const delet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mascotaDeleted = await mascotasService.removeMascota(id);
    if (!mascotaDeleted) {
      res.status(404).json({ message: `Mascota no encontrada.` });
    }
    return res.status(200).json({
      message: `Los datos de la Mascota con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error al eliminar la Mascota.` });
  }
};
