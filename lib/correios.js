import ConstructorPDF from "../helpers/constructorPDF.js";

export async function Correios(paramsPDF) {

  const cpdf = new ConstructorPDF();

  cpdf.pathTranslate({ path: "M0,20H283V399H0V20Z", translate: [8, 0] });
  cpdf.path({
    paths: [
      "M58,208H271",
      "M202,224h79",
      "M58,225H159",
      "M0,330H283",
      "M4,229.5H281"
    ],
    pathsFill: ["M4,231H158v13H4V231Z"]
  });

  cpdf.text({ value: "AA0008919067", position: [10, 30] });
  cpdf.text({ value: "UNIDADE HOMOLOGAÇÃO", position: [10, 30] });
  cpdf.text({ value: "21032023", position: [10, 30] });
  cpdf.text({ value: "Contrato", position: [10, 30] });

  cpdf.endDoc();

  const base64PDF = cpdf.gerateBase64();

  return base64PDF;
}