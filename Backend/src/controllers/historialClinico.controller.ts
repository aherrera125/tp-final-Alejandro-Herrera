import { Request, Response } from "express";
import * as historialClinicoService from "../services/historialClinico.service";
import { IHistorialClinico } from "../types/IHistorialClinico";

//getAll
export const getAll = async (_req: Request, res: Response) => {
  try {
    const historialClinicoData =
      await historialClinicoService.getAllHistorialClinico();
    return res.status(200).json({ historialClinicoData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener los historiales clínicos.` });
  }
};

//getById
export const getById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    const historialClinicoData =
      await historialClinicoService.getHistorialClinicoById(id);
    if (!historialClinicoData) {
      return res
        .status(404)
        .json({ message: "Historial clínico no encontrado." });
    }
    return res.status(200).json({ historialClinicoData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al obtener el historial clínico con id ${id}.` });
  }
};
//getByUserId
export const getByUserId = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    const userId = req.user.id?.toString() ?? "";
    const historialClinicoData =
      await historialClinicoService.getHistorialClinicoByUserId(userId);

    if (!historialClinicoData) {
      return res
        .status(404)
        .json({ message: "Historial clínico no encontrado." });
    }

    return res.status(200).json(historialClinicoData);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el historial clínico",
    });
  }
};
//create()
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado." });
    }
    const userId = req.user.id?.toString() ?? "";
    const historialClinicoData: IHistorialClinico = req.body;

    const historialClinicoCreated =
      await historialClinicoService.addHistorialClinico(
        userId,
        historialClinicoData,
      );
    return res.status(201).json({ historialClinicoCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al crear el Historial Clinico.` });
  }
};
//update()
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const historialClinicoData: IHistorialClinico = req.body;
    const historialClinicoUpdated =
      await historialClinicoService.editHistorialClinico(
        id,
        historialClinicoData,
      );
    if (!historialClinicoUpdated) {
      return res
        .status(404)
        .json({ message: `Historial clínico no encontrado.` });
    }
    return res.status(200).json({
      historialClinicoUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error al actualizar los datos del historial clínico.`,
    });
  }
};
//delete()
export const delet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const historialClinicoDeleted =
      await historialClinicoService.removeHistorialClinico(id);
    if (!historialClinicoDeleted) {
      res.status(404).json({ message: `Historial clínico no encontrado.` });
    }
    return res.status(200).json({
      message: `Los datos del Historial clínico con id ${id} se eliminaron exitosamente.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error al eliminar el historial clínico.` });
  }
};
