import { Router } from "express";

import { etiquetasRoutes } from "./etiquetas.routes";
import { declaracaoRoutes } from "./declaracaoconteudo.routes";

const router = Router();

router.use("/etiqueta", etiquetasRoutes);
router.use("/declaracaoConteudo", declaracaoRoutes);

export { router }