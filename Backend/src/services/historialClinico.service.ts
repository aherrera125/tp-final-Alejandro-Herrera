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
  deleteDuenio,
  findDuenioByMascotaId,
  updateDuenio,
} from "../models/duenios.model";
import {
  createMascota,
  deleteMascota,
  findMascotaByHistorialId,
  updateMascota,
} from "../models/mascotas.model";

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
  return await findHistorialClinicoByUserId(userId);
};

export const addHistorialClinico = async (
  userId: string,
  data: IHistorialClinicoDTO,
) => {
  try {
    const duenioId = await createDuenio(data);
    const mascotaId = await createMascota(data, duenioId.toString());
    return await createHistorialClinico(userId, mascotaId.toString(), data);
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
  const mascotaId = await findMascotaByHistorialId(historialId);
  if (!mascotaId) {
    throw new Error(
      "La mascota no se encontró para el historial clínico proporcionado",
    );
  }
  await updateMascota(mascotaId, data);
  //modificar los datos del dueño en la historia clinica
  const duenioId = await findDuenioByMascotaId(mascotaId);
  if (!duenioId) {
    throw new Error("Dueño no encontrado para la mascota proporcionado");
  }
  await updateDuenio(duenioId, data);

  return await updateHistorialClinico(historialId, data);
};

export const removeHistorialClinico = async (id: string) => {
  //Eliminado logico de los datos de la mascota de la historia clinica
  const mascotaId = await findMascotaByHistorialId(id);
  if (!mascotaId) {
    throw new Error("Mascota not found for the given historial ID");
  }
  await deleteMascota(mascotaId);
  //Eliminado logico de los datos del dueño de la historia clinica
  const duenioId = await findDuenioByMascotaId(mascotaId);
  if (!duenioId) {
    throw new Error("Dueño not found for the given mascota ID");
  }
  await deleteDuenio(duenioId);
  return await deleteHistorialClinico(id);
};
