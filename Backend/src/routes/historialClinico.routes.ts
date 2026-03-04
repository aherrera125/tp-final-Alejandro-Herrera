import { Router } from "express";
import * as historialClinicoController from "../controllers/historialClinico.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { authorizePermission } from "../middlewares/authorizePermission.middleware";
const router = Router();

router.get(
  "/",
  authenticate,
  authorizePermission("historial:read"),
  historialClinicoController.getAll,
);
router.get(
  "/byUserId",
  authenticate,
  authorizePermission("historial:read"),
  historialClinicoController.getByUserId,
);
router.get(
  "/:id",
  authenticate,
  authorizePermission("historial:read"),
  historialClinicoController.getById,
);
router.post(
  "/",
  authenticate,
  authorizePermission("historial:create"),
  historialClinicoController.create,
);
router.put(
  "/:id",
  authenticate,
  authorizePermission("historial:update"),
  historialClinicoController.update,
);
router.delete(
  "/:id",
  authenticate,
  authorizePermission("historial:delete"),
  historialClinicoController.delet,
);
export default router;
