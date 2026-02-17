import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import * as dueniosController from "../controllers/duenios.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  dueniosController.getAll,
);
router.get(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  dueniosController.getById,
);
router.post(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  dueniosController.create,
);
router.put(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  dueniosController.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["user", "admin"]),
  dueniosController.delet,
);

export default router;
