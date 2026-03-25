import express from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import dueniosRoutes from "./routes/duenios.routes";
import mascotasRoutes from "./routes/mascotas.routes";
import userRoutes from "./routes/users.routes";
import historialClinicoRoutes from "./routes/historialClinico.routes";
import rolesRoutes from "./routes/roles.routes";
import cors from "cors";

// Creamos la aplicación Express
const app = express();

// Configuracion CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tp-final-ah-patitasfelices.vercel.app",
      "https://tp-final-ah-patitasfeli-git-bcf83a-alejandros-projects-dfaa9e1d.vercel.app",
      "https://tp-final-ah-patitasfelices-4f1e2e5s3.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Definimos el puerto del servidor
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
// Solo si necesitamos servir HTML desde el backend
//app.use(express.static(path.join(__dirname, "..", "public")));

//Endpoint de registro y login
app.use("/auth", authRoutes);

//Endpoints de la API
app.use("/api/user", userRoutes);
app.use("/api/duenios", dueniosRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/historialClinico", historialClinicoRoutes);
app.use("/api/roles", rolesRoutes);

// Prueba endpoint base
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API Patitas Felices funcionando en Render🐶",
  });
});

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
