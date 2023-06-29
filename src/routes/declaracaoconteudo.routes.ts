import { Router } from "express";

import { DeclaracaoConteudoController } from "../controller/DeclaracaoConteudoController";

const declaracaoRoutes = Router();
const createDeclaracaoConteudo = new DeclaracaoConteudoController();

declaracaoRoutes.post("/gerar", createDeclaracaoConteudo.DeclaracaoConteudo);

export { declaracaoRoutes }