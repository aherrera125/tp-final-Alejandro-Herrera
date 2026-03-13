import { findAllRoles } from "../models/roles.model";

export const getAllRoles = async () => {
  return await findAllRoles();
};
