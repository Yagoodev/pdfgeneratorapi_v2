import { generateVectorPathStrokeContent } from "./components/path.js";
import { getIndividualDate } from "../helpers/common.js";

import { Base64Encode } from "base64-stream";

import PDFDocument from "pdfkit";

export async function createPDF(paramsPDF) {

  const doc = new PDFDocument({ margin: 5, size: "A6" });
  const stream = doc.pipe(new Base64Encode());

  let itemY = 144;
  let contentY = 144;
  let amountY = 144;
  let valueY = 144;

  let base64PDF = "";

  const vectorPath = [
    "M8.039,13.5h283.92V58.518H8.039V13.5Z",
    "M7.5,69.01H292.487v53.046H7.5V69.01Z",
    "M7.512,132.087H291.431V297.074H7.512V132.087Z",
    "M7.512,303.837H291.431v71.588H7.512V303.837Zm0,0H291.431v71.588H7.512V303.837Z",
    "M7.512,378.813H291.431V402.49H7.512V378.813Zm0,0H291.431V402.49H7.512V378.813Z",
    "M150.527,69.523v53.021",
    "M8.039,77.24H293.015",
    "M8.039,85.525H293.015m-284.976,10H293.015m-284.976,8H293.015m-284.976,9H293.015",
    "M60.813,113.54v8",
    "M205.189,113.54v8",
    "M8.039,141.051H290.9",
    "M8.039,152.056H290.9",
    "M8.039,164.061H290.9",
    "M8.039,177.066H290.9",
    "M8.039,191.071H290.9",
    "M8.039,205.077H290.9",
    "M8.039,219.083H290.9",
    "M8.039,233.088H290.9",
    "M8.039,247.094H290.9",
    "M8.039,261.1H290.9",
    "M8.039,275.105H290.9",
    "M8.039,287.11H290.9M8.039,312.62H290.9",
    "M13.317,367.642h90.769",
    "M106.2,367.642h14.777",
    "M129.418,367.642h38",
    "M175.858,367.642h20.054",
    "M199.078,367.642h86.548m-86.548,0h86.548",
    "M31,133V297",
    "M229,133V297",
    "M258,133V297"
  ]

  paramsPDF.map(param => {
    generateVectorPathStrokeContent(doc, vectorPath);

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.objeto}`, -40, 6, {
        align: "right"
      });

    doc.font('Helvetica-Bold')
      .fontSize(12)
      .text("DECLARAÇÃO DE CONTEÚDO", 67, 35)


    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("REMETENTE", 60, 71)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`NOME: ${param.remetente.nome}`, 10, 79)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`ENDEREÇO: ${param.remetente.endereco}`, 10, 88, {
        width: 130,
        lineGap: 1.8
      })

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CIDADE: ${param.remetente.cidade}`, 10, 106)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CEP: ${param.remetente.cep}`, 10, 115)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CPF/CNPJ: ${param.remetente.cpfCnpj}`, 64, 115)



    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("DESTINATÁRIO", 200, 71)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`NOME: ${param.destinatario.nome}`, 153, 79)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`ENDEREÇO: ${param.destinatario.endereco}`, 153, 88, {
        width: 130,
        lineGap: 1.8
      })

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CIDADE: ${param.destinatario.cidade}`, 153, 106)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CEP: ${param.destinatario.cep}`, 153, 115)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`CPF/CNPJ: ${param.destinatario.cpfCnpj}`, 206, 115)

    
    
    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("IDENTIFICAÇÃO DOS BENS", 92, 135)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("ITEM", 11, 144)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("OBJETO", 37, 144)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("QTD.", 231, 144)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("VALOR", 261, 144)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.item}`, 11, itemY += 11)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.conteudo}`, 37, contentY += 11)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.quantidade}`, 231, amountY += 11)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.valor}`, 261, valueY += 11)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.quantidade}`, 232, 266)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.produtos.valor}`, 262, 266)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text(`TOTAIS: `, 196, 278)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text(`PESO TOTAL (Kg): `, 162, 289)

    doc.font('Helvetica-Bold')
      .fontSize(6)
      .text("DECLARAÇÃO", 126, 306)

    doc.font('Helvetica')
      .fontSize(5)
      .text(`
      Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996,
      uma vez que não realizo, com habitualidade ou sem volume que caracterize intuito comercial, operações de circulação
      de mercadoria, ainda que se iniciem no exterior, ou estou disopensado da emissãoda nota fiscal por força da legislação
      tributária vigente, responsabilizando-me, nos termos da lei e a quem de direito, por informações inverídicas.
      Declaro ainda que não estou postando conteúdo inflamável, explosivo, causador de combustão espontânea,
      tóxico, corrosivo, gás ou qualquer outro conteúdo que constitua perigo, conforme o art. 13 da Lei Postal nº 6.538/78.
    `, -5, 312, {
        align: "center"
      })

    const individualDate = getIndividualDate(param.datalog);

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${param.remetente.cidade}`, 20, 360)

    doc.font('Helvetica')
      .fontSize(12)
      .text(",", 103, 360)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${individualDate.day}`, 110, 360)

    doc.font('Helvetica')
      .fontSize(6)
      .text("de", 121, 360)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${individualDate.month}`, 132, 360)

    doc.font('Helvetica')
      .fontSize(6)
      .text("de", 168, 360)

    doc.font('Helvetica')
      .fontSize(6)
      .text(`${individualDate.year}`, 178, 360)

    doc.font('Helvetica')
      .fontSize(5)
      .text("Assinatura do Declarante/Remetente", 199, 370)

    doc.font('Helvetica-Bold')
      .fontSize(5)
      .text(`OBSERVAÇÃO:`, 10, 382)

    doc.font('Helvetica')
      .fontSize(5)
      .text(`
        Constitui crime contra a ordem suprimir ou reduzir tributo, ou contribuição social e qualquer acessório
        (Lei 8.137/90 Art. 1º, V).
      `, 0, 384)
  })

  doc.end();

  await stream.on('data', chunk => {
    base64PDF += chunk;
  });

  return base64PDF;
}