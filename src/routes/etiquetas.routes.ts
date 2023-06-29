import { Router } from "express";

import { EtiquetasController } from "../controller/EtiquetasController";

const etiquetasRoutes = Router();
const createEtiquetas = new EtiquetasController();

etiquetasRoutes.post("/correios", createEtiquetas.EtiquetaCorreios);
etiquetasRoutes.post("/drops", createEtiquetas.EtiquetaDrops);

export { etiquetasRoutes }