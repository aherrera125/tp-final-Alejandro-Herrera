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
import {
  createDuenio,
  findDuenioByMascotaId,
  updateDuenio,
} from "../models/duenios.model";
import {
  createMascota,
  findMascotaByHistorialId,
  updateMascota,
} from "../models/mascotas.model";
import { update } from "../controllers/duenios.controller";

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
  historialId: string,
  data: IHistorialClinicoDTO,
) => {
  //modificar los datos de la mascota en la historia clinica
  /*const mascotaId = await findMascotaByHistorialId(historialId);
  if (!mascotaId) {
    throw new Error("Mascota not found for the given historial ID");
  }
  await updateMascota(mascotaId, data);
  //modificar los datos del dueño en la historia clinica
  const duenioId = await findDuenioByMascotaId(mascotaId);
  await updateDuenio(duenioId, data);*/

  return await updateHistorialClinico(historialId, data);
};

export const removeHistorialClinico = async (id: string) => {
  return await deleteHistorialClinico(id);
};
