import { Router } from "express";
import voto from "./models/register/routes";
import token from "./models/tokens/routes";
import {
  ReportesController,
  VotoPorUsuario,
} from "./models/register/controllers/report";
import { verifyToken } from "./infraestructura/verify";

const router = Router();

router.use("/api", voto);
router.use("/api/token", token);
router.use(verifyToken);
router.get("/api/dispositivo", VotoPorUsuario);
router.get("/reportes/por-cuenta", ReportesController.reportePorCuenta);
router.get("/reportes/total", ReportesController.reporteTotal);
router.get("/reportes/por-ciudad", ReportesController.reporteTotalPorCiudad);
router.get("/reportes/por-metodo", ReportesController.reportePorMetodo);
router.get(
  "/reportes/por-metodo-cuenta",
  ReportesController.reportePorMetodoCuenta
);
router.get(
  "/reportes/por-ciudad-cuenta",
  ReportesController.reportePorCiudadCuenta
);

export default router;
