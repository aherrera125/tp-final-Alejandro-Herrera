import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  getAll,
  getById,
  create,
  update,
  delet,
} from "../controllers/users.controller";
import { authorizePermission } from "../middlewares/authorizePermission.middleware";

const router = Router();
router.get("/", authenticate, authorizePermission("user:read"), getAll);
router.get("/getById", authenticate, authorizePermission("user:read"), getById);
router.post("/", authenticate, authorizePermission("user:create"), create);
router.put("/", authenticate, authorizePermission("user:update"), update);
router.delete("/", authenticate, authorizePermission("user:delete"), delet);

export default router;
