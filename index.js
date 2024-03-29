import { DeclaracaoConteudo } from "./lib/declaracao_conteudo.js";
import { DropsLabel, convertToBase64 } from "./lib/drops.js";
import { Correios } from "./lib/correios.js";
import { paramsDataValidate } from "./helpers/validators.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/gerar_pdf", async (req, res) => {

  const paramsPDF = req.body;
  const paramsPDFValidated = paramsDataValidate(paramsPDF);

  if (!paramsPDFValidated.success) {
    return res.status(500).json({
      message: paramsPDFValidated.message
    })
  }

  const docPDF = await DeclaracaoConteudo([paramsPDFValidated.data]);

  return res.json({
    base64PDF: docPDF
  });
});

app.post("/etiqueta/drops/gerar", async (req, res) => {

  const paramsPDF = req.body;

  await DropsLabel(paramsPDF);

  return res.json({
    status: "200"
  });

});

app.get("/etiqueta/drops/listar", async (req, res) => {
  
  const paramsPDF = req.body;

  const dropsLabel = await convertToBase64(paramsPDF);

  return res.json({
    base64: dropsLabel
  });

});

app.post("/etiqueta/correios/gerar", async (req, res) => {
  
  // const paramsPDF = req.body;

  const correiosLabel = await Correios();

  return res.json({
    base64: correiosLabel
  });

});

app.listen(3000);