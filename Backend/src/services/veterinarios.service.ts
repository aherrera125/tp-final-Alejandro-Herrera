import { IVeterinario } from "../types/IVeterinario";
import {
  findAllVeterinarios,
  findVeterinarioById,
  createVeterinario,
  updateVeterinario,
  deleteVeterinario,
  findVeterinarioByUserId,
} from "../models/veterinarios.model";

export const getAllVeterinarios = async () => {
  return await findAllVeterinarios();
};

export const getVeterinarioById = async (
  id: string,
): Promise<IVeterinario | null> => {
  return await findVeterinarioById(id);
};

export const getVeterinarioByUserId = async (
  user_id: string,
): Promise<IVeterinario | null> => {
  return await findVeterinarioByUserId(user_id);
};

export const addVeterinario = async (data: IVeterinario) => {
  return await createVeterinario(data);
};

export const editVeterinario = async (id: string, data: IVeterinario) => {
  return await updateVeterinario(id, data);
};

export const removeVeterinario = async (id: string) => {
  return await deleteVeterinario(id);
};
