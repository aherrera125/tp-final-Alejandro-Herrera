import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator";
import rateLimit from "express-rate-limit";
import { authorizePermission } from "../middlewares/authorizePermission.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Limitar intentos de registro y login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos
  message: "Demasiados intentos, inténtalo de nuevo más tarde",
});

//auth/register
router.post(
  "/register",
  authenticate,
  authorizePermission("user:create"),
  authLimiter,
  registerValidator,
  register,
);
//auth/login
router.post("/login", /*authLimiter,*/ loginValidator, login);

export default router;
