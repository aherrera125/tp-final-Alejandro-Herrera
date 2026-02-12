import { IMascota } from "../types/IMascota";
import {
  findAllMascotas,
  findMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
} from "../models/mascotas.model";

export const getAllMascotas = async () => {
  return await findAllMascotas();
};

export const getMascotaById = async (id: string): Promise<IMascota | null> => {
  return await findMascotaById(id);
};

export const addMascota = async (data: IMascota) => {
  return await createMascota(data);
};

export const editMascota = async (id: string, data: IMascota) => {
  return await updateMascota(id, data);
};

export const removeMascota = async (id: string) => {
  return await deleteMascota(id);
};
