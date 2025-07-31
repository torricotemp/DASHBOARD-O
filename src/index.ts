import express from "express";
import multer from "multer";
const app = express();
import router from "./manage";
import { generarTokenManual } from "./infraestructura/generate";
const upload = multer();
app.use((req, res, next) => {
  const clientInfo = {
    method: req.method,
    path: req.originalUrl,
    query: req.query,
    body: req.body,
    headers: {
      host: req.headers.host || "no disponible",
      origin: req.headers.origin || "no disponible",
      referer: req.headers.referer || "no disponible",
      "user-agent": req.headers["user-agent"] || "no disponible",
    },
    ipInfo: {
      "x-forwarded-for": req.headers["x-forwarded-for"] || "no disponible",
      "x-real-ip": req.headers["x-real-ip"] || "no disponible",
      "cf-connecting-ip": req.headers["cf-connecting-ip"] || "no disponible",
      "true-client-ip": req.headers["true-client-ip"] || "no disponible",
      "x-client-ip": req.headers["x-client-ip"] || "no disponible",
      forwarded: req.headers["forwarded"] || "no disponible",
      remoteAddress: req.socket.remoteAddress || "no disponible",
    },
    timestamp: new Date().toISOString(),
  };

  console.log("📥 Nueva solicitud:");
  console.log(JSON.stringify(clientInfo, null, 2));
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK si funciona ",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use(router);

const token = generarTokenManual();
console.log(token);
const PORT = process.env.PORT || (3060 as number);
app.listen(3060, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`También accesible en http://0.0.0.0:${PORT}`);
});
