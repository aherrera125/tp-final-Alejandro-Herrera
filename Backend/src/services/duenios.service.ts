import { IDuenio } from "../types/IDuenio";
import {
  findAllDuenios,
  findDuenio,
  createDuenio,
  updateDuenio,
  deleteDuenio,
} from "../models/duenios.model";

export const getAllDuenios = async () => {
  return await findAllDuenios();
};

export const getDuenioById = async (id: string): Promise<IDuenio | null> => {
  return await findDuenio(id);
};

export const addDuenio = async (data: IDuenio) => {
  return await createDuenio(data);
};

export const editDuenio = async (id: string, data: IDuenio) => {
  return await updateDuenio(id, data);
};

export const removeDuenio = async (id: string) => {
  return await deleteDuenio(id);
};
