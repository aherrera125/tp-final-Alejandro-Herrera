import { Router } from "express";
import * as veterinariosController from "../controllers/veterinarios.controller";

const router = Router();
router.get("/", veterinariosController.getAll);
router.get("/:id", veterinariosController.getById);
router.post("/", veterinariosController.create);
router.put("/:id", veterinariosController.update);
router.delete("/:id", veterinariosController.delet);

export default router;
