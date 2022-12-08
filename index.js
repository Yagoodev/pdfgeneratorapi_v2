import { createPDF } from "./lib/pdfkit.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "0.0.0.0" }))
app.use(express.json());

app.post("/gerar_pdf", async (req, res) => {

  const paramsPDF = req.body;

  console.log(paramsPDF);

  const docPDF = await createPDF(paramsPDF);

  return res.json({
    base64PDF: docPDF
  });
});

app.listen(3000);