import { IDuenio } from "../types/IDuenio";
import {
  findAllDuenios,
  findDuenio,
  updateDuenio,
  deleteDuenio,
  findDuenioByMascotaId,
} from "../models/duenios.model";
import { IHistorialClinicoDTO } from "../types/IHistorialClinico";

export const getAllDuenios = async () => {
  return await findAllDuenios();
};

export const getDuenioById = async (id: string): Promise<IDuenio | null> => {
  return await findDuenio(id);
};

export const getDuenioByMascotaId = async (
  MascotaId: string,
): Promise<IDuenio | null> => {
  return (await findDuenioByMascotaId(MascotaId)) as IDuenio | null;
};

/*export const addDuenio = async (data: IDuenio) => {
  return await createDuenio(data);
};*/

export const editDuenio = async (id: string, data: IHistorialClinicoDTO) => {
  return await updateDuenio(id, data);
};

export const removeDuenio = async (id: string) => {
  return await deleteDuenio(id);
};
