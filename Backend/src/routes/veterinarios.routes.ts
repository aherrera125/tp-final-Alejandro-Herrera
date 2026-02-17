import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import * as veterinariosController from "../controllers/veterinarios.controller";

const router = Router();
router.get(
  "/",
  authenticate,
  authorize(["user"]),
  veterinariosController.getAll,
);
router.get(
  "/me",
  authenticate,
  authorize(["user", "admin"]),
  veterinariosController.getByUserId,
);
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  veterinariosController.getById,
);
router.post(
  "/",
  authenticate,
  authorize(["user"]),
  veterinariosController.create,
);
router.put(
  "/:id",
  authenticate,
  authorize(["user"]),
  veterinariosController.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["user"]),
  veterinariosController.delet,
);

export default router;
