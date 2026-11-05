import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// ¡ESTA ES LA LÍNEA QUE DA VIDA A TU HTML!
app.use(express.static('public')); 

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Rutas del recurso
app.use("/api/productos", productosRoutes);

// ... (el resto de tu código de errores)

// 404 genérico
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores (sin stack trace en producción)
app.use((err, req, res, next) => {
  console.error("[errorHandler]", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
});

export default app;