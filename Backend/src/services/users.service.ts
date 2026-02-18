import { IUsuario } from "../types/IUsuario";
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/users.model";

export const getAllVeterinarios = async () => {
  return await findAllUsers();
};

export const getVeterinarioById = async (
  id: string,
): Promise<IUsuario | null> => {
  return await findUserById(id);
};

export const addVeterinario = async (data: IUsuario) => {
  return await createUser(data);
};

export const editVeterinario = async (id: string, data: IUsuario) => {
  return await updateUser(id, data);
};

export const removeVeterinario = async (id: string) => {
  return await deleteUser(id);
};
