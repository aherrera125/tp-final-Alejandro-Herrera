import express from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import dueniosRoutes from "./routes/duenios.routes";
import mascotasRoutes from "./routes/mascotas.routes";
import userRoutes from "./routes/users.routes";
import historialClinicoRoutes from "./routes/historialClinico.routes";

// Creamos la aplicación Express
const app = express();

// Definimos el puerto del servidor
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

//Endpoint de registro y login
app.use("/auth", authRoutes);

//Endpoints de la API
app.use("/api/user", userRoutes);
app.use("/api/duenios", dueniosRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/historialClinico", historialClinicoRoutes);

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});

// authenticate y authorize se usan en las tutas
