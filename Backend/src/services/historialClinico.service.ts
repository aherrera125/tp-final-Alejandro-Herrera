import {
  IHistorialClinico,
  IHistorialClinicoDTO,
} from "../types/IHistorialClinico";
import {
  findAllHistorialClinico,
  findHistorialClinicoById,
  findHistorialClinicoByUserId,
  createHistorialClinico,
  updateHistorialClinico,
  deleteHistorialClinico,
} from "../models/historialClinico.model";
import { createDuenio } from "../models/duenios.model";
import { createMascota } from "../models/mascotas.model";

export const getAllHistorialClinico = async () => {
  return await findAllHistorialClinico();
};

export const getHistorialClinicoById = async (
  id: string,
): Promise<IHistorialClinico | null> => {
  return await findHistorialClinicoById(id);
};

export const getHistorialClinicoByUserId = async (
  userId: string,
): Promise<IHistorialClinico[]> => {
  console.log("Buscando historial clínico para el usuario con ID:", userId);
  return await findHistorialClinicoByUserId(userId);
};

export const addHistorialClinico = async (
  userId: string,
  data: IHistorialClinicoDTO,
) => {
  try {
    const duenioId = await createDuenio(data);
    const mascotaId = await createMascota(data, duenioId);
    return await createHistorialClinico(userId, mascotaId, data);
  } catch (error) {
    console.error("Error in addHistorialClinico:", error);
    throw error;
  }
};

export const editHistorialClinico = async (
  id: string,
  data: IHistorialClinico,
) => {
  return await updateHistorialClinico(id, data);
};

export const removeHistorialClinico = async (id: string) => {
  return await deleteHistorialClinico(id);
};
