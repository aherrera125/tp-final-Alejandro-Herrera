import { Router } from "express";
import * as mascotasController from "../controllers/mascotas.controller";

const router = Router();

router.get("/", mascotasController.getAll);
router.get("/:id", mascotasController.getById);
router.post("/", mascotasController.create);
router.put("/:id", mascotasController.update);
router.delete("/:id", mascotasController.delet);

export default router;
