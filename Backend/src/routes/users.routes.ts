import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  getAll,
  getById,
  create,
  update,
  delet,
} from "../controllers/users.controller";

const router = Router();
router.get("/", authenticate, authorize(["user"]), getAll);
router.get("/me", authenticate, authorize(["user", "admin"]), getById);
router.post("/", authenticate, authorize(["user"]), create);
router.put("/", authenticate, authorize(["user"]), update);
router.delete("/", authenticate, authorize(["user"]), delet);

export default router;
