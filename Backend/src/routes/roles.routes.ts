import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { authorizePermission } from "../middlewares/authorizePermission.middleware";
import * as rolesController from "../controllers/roles.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizePermission("rol:read"),
  rolesController.getAll,
);
router.get(
  "/:id",
  authenticate,
  authorizePermission("rol:read"),
  //rolesController.getById,   -> Hacer
);
router.post(
  "/",
  authenticate,
  authorizePermission("rol:create"),
  //rolesController.create,   -> Hacer
);
router.put(
  "/:id",
  authenticate,
  authorizePermission("rol:update"),
  //rolesController.update,  -> Hacer
);
router.delete(
  "/:id",
  authenticate,
  authorizePermission("rol:delete"),
  //rolesController.delete, -> Hacer
);

export default router;
