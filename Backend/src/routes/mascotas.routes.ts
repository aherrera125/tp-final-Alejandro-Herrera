import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import * as mascotasController from "../controllers/mascotas.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  mascotasController.getAll,
);
router.get(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  mascotasController.getById,
);
router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  mascotasController.create,
);
router.put(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  mascotasController.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  mascotasController.delet,
);

export default router;
