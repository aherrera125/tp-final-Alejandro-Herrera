import { Router } from "express";
import * as dueniosController from "../controllers/duenios.controller";

const router = Router();

router.get("/", dueniosController.getAll);
router.get("/:id", dueniosController.getById);
router.post("/", dueniosController.create);
router.put("/:id", dueniosController.update);
router.delete("/:id", dueniosController.delet);

export default router;
