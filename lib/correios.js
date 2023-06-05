import { generateVectorPathStrokeContent, generateVectorPathFillContent, generateVectorPathStrokeContentTranslate } from "./components/path.js";

import { Base64Encode } from "base64-stream";

import PDFDocument from "pdfkit";

export async function Correios(paramsPDF) {

  const doc = new PDFDocument({ margins: { top: 200, left: 0, bottom: 0, right: 0 }, size: "A6" });
  const stream = doc.pipe(new Base64Encode());

  let base64PDF = "";

  const vectorPath = [
    "M58,208H271",
    "M202,224h79",
    "M58,225H159",
    "M0,330H283",
    "M4,229.5H281"
  ]

  const vectorFillPath = [
    "M4,231H158v13H4V231Z"
  ]

  generateVectorPathStrokeContentTranslate(doc, "M0,20H283V399H0V20Z", { horizontal: 8, vertical: 0 });
  generateVectorPathStrokeContent(doc, vectorPath);
  generateVectorPathFillContent(doc, vectorFillPath);

  doc.end();

  await stream.on('data', chunk => {
    base64PDF += chunk;
  });

  return base64PDF;
}