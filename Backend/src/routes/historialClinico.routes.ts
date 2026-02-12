import { Router } from "express";
import * as historialClinicoController from "../controllers/historialClinico.controller";
const router = Router();

router.get("/", historialClinicoController.getAll);
router.get("/:id", historialClinicoController.getById);
router.post("/", historialClinicoController.create);
router.put("/:id", historialClinicoController.update);
router.delete("/:id", historialClinicoController.delet);
export default router;
