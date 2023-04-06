import { generateVectorPathStrokeContent, generateVectorPathFillContent } from "./components/path.js";

import { Base64Encode } from "base64-stream";

import PDFDocument from "pdfkit";

export async function Correios(paramsPDF) {

  const doc = new PDFDocument({ margin: 5, size: "A6" });
  const stream = doc.pipe(new Base64Encode());

  let base64PDF = "";

  const vectorPath = [
    "M16.494,22.494H276.506V346.506H16.494V22.494Z",
    "M16.994,197.515H277.007",
    "M68,176.515H266.006",
    "M16.994,286.515H277.007",
    "M68,191.515H159",
    "M201.9,191.011h64.111",
    "M19.5,200.458h164v10.084H19.5V200.458Z"
  ]

  const vectorFillPath = [
    "M19.5,200.458h164v10.084H19.5V200.458Z"
  ]

  generateVectorPathStrokeContent(doc, vectorPath);
  generateVectorPathFillContent(doc, vectorFillPath);

  doc.font('Helvetica')
    .fontSize(6)
    .text('Texto qualquer', -40, 6, {
      align: "right"
    });

  doc.end();

  await stream.on('data', chunk => {
    base64PDF += chunk;
  });

  return base64PDF;
}