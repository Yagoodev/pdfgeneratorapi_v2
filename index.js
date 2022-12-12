import { createPDF } from "./lib/pdfkit.js";
import { paramsDataValidate } from "./helpers/validators.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "0.0.0.0" }))
app.use(express.json());

app.post("/gerar_pdf", async (req, res) => {

  const paramsPDF = req.body;
  const paramsPDFValidated = paramsDataValidate(paramsPDF);

  if(!paramsPDFValidated.success) {
    return res.status(500).json({
      message: paramsPDFValidated.message
    })
  }

  const docPDF = await createPDF([paramsPDFValidated.data]);
  return res.json({
    base64PDF: docPDF
  });
});

app.listen(3000);