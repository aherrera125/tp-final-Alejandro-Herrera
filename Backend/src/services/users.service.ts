import { IUsuario } from "../types/IUsuario";
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/users.model";

export const getAllUsuarios = async () => {
  return await findAllUsers();
};

export const getUsuarioById = async (id: string): Promise<IUsuario | null> => {
  return await findUserById(id);
};

export const addUsuario = async (data: IUsuario) => {
  return await createUser(data);
};

export const editUsuario = async (id: string, data: IUsuario) => {
  return await updateUser(id, data);
};

export const removeUsuario = async (id: string) => {
  return await deleteUser(id);
};
