import express from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import { authenticate, authorize } from "./middlewares/auth.middleware";
import dueniosRoutes from "./routes/duenios.routes";
import mascotasRoutes from "./routes/mascotas.routes";
import veterinariosRoutes from "./routes/veterinarios.routes";
import historialClinicoRoutes from "./routes/historialClinico.routes";

// Creamos la aplicación Express
const app = express();

// Definimos el puerto del servidor
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

//app.use("/auth", authRoutes);

// Ruta protegida (requiere autenticación)
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Acceso de administrador permitido",
    user: req.user,
  });
});

//Endpoints de la API
app.use("/api/user", authRoutes);
app.use("/api/duenios", dueniosRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/veterinarios", veterinariosRoutes);
app.use("/api/historialClinico", historialClinicoRoutes);

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
