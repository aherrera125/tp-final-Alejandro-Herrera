import { Router } from "express";
import * as historialClinicoController from "../controllers/historialClinico.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
const router = Router();

router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  historialClinicoController.getAll,
);
router.get(
  "/me",
  authenticate,
  authorize(["user"]),
  historialClinicoController.getByUserId,
);
router.get(
  "/:id",
  authenticate,
  authorize(["user"]),
  historialClinicoController.getById,
);
router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  historialClinicoController.create,
);
router.put(
  "/:id",
  authenticate,
  authorize(["user"]),
  historialClinicoController.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  historialClinicoController.delet,
);
export default router;
