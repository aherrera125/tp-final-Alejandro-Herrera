import { IHistorialClinico } from "../types/IHistorialClinico";
import {
  findAllHistorialClinico,
  findHistorialClinicoById,
  createHistorialClinico,
  updateHistorialClinico,
  deleteHistorialClinico,
} from "../models/historialClinico.model";

export const getAllHistorialClinico = async () => {
  return await findAllHistorialClinico();
};

export const getHistorialClinicoById = async (
  id: string,
): Promise<IHistorialClinico | null> => {
  return await findHistorialClinicoById(id);
};

export const addHistorialClinico = async (data: IHistorialClinico) => {
  return await createHistorialClinico(data);
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
