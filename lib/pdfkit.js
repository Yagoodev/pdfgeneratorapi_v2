import { generateVectorPathAll } from "./components/path.js";
import { Common } from "../helpers/common.js";

import { Base64Encode } from "base64-stream";

import PDFDocument from "pdfkit";

export async function createPDF(paramsPDF) {

  const doc = new PDFDocument({ margin: 5, size: "A5" });
  const stream = doc.pipe(new Base64Encode());

  const common = new Common();

  let itemY = 216;
  let contentY = 216;
  let amountY = 216;
  let valueY = 216;

  let base64PDF = "";

  const vectorPath = [
    "M8,31H415V96H8V31Zm0,77H415v77H8V108Zm0,89H416V432H8V197ZM8,443H415V546H8V443ZM8,549H416v36H8V549Z",
    "M8,121H415M8,121H415",
    "M8,134H415M8,134H415",
    "M8,147H415M8,147H415",
    "M8,160H415M8,160H415",
    "M8,172H415M8,172H415",
    "M8,212H416",
    "M8,226H416M8,226H416",
    "M8,245H416",
    "M8,265H416",
    "M8,284H416",
    "M8,302H416",
    "M8,320.928H416",
    "M8,340.977H416",
    "M8,360.023H416",
    "M8,380.072H416",
    "M8,399H416",
    "M8,416H416",
    "M42.643,212V432",
    "M325.357,212V432",
    "M8,456H415",
    "M17,534H145",
    "M149,534h21",
    "M184,534h53",
    "M249,534h28",
    "M283,534H408",
    "M368,212V432",
    "M214,108v77",
    "M85,172v13",
    "M286,172v13"
  ]

  console.log(paramsPDF);

  paramsPDF.map((param, index) => {
    generateVectorPathAll(doc, vectorPath);

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.objeto}`, 0, 20, {
        align: "right"
      });

    doc.font('Helvetica-Bold')
      .fontSize(12)
      .text("DECLARAÇÃO DE CONTEÚDO", 128, 60)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("REMETENTE", 85, 113)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`NOME: ${param.remetente.nome}`, 10, 125)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`ENDEREÇO: ${param.remetente.endereco}`, 10, 138, {
        width: 200,
        lineGap: 2
      })

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CIDADE: ${param.remetente.cidade}`, 10, 164)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CEP: ${param.remetente.cep}`, 10, 176)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CPF/CNPJ: ${param.remetente.cpfCnpj}`, 87, 176)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("DESTINATÁRIO", 280, 113)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`NOME: ${param.destinatario.nome}`, 217, 125)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`ENDEREÇO: ${param.destinatario.endereco}`, 217, 138, {
        width: 200,
        lineGap: 4
      })

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CIDADE: ${param.destinatario.cidade}`, 217, 164)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CEP: ${param.destinatario.cep}`, 217, 176)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`CPF/CNPJ: ${param.destinatario.cpfCnpj}`, 289, 176)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("IDENTIFICAÇÃO DOS BENS", 158, 202)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("ITEM", 14, 216)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("OBJETO", 48, 216)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("QTD.", 330, 216)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("VALOR", 372, 216)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.item}`, 12, itemY += 18)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.conteudo}`, 48, contentY += 18)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.quantidade}`, 330, amountY += 18)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.valor}`, 372, valueY += 18)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.quantidade}`, 330, 405)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${param.produtos.valor}`, 372, 405)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text(`TOTAIS: `, 250, 405)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text(`PESO TOTAL (Kg): `, 213, 421)

    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text("DECLARAÇÃO", 178, 447)

    doc.font('Helvetica')
      .fontSize(7)
      .text(`
      Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996,
      uma vez que não realizo, com habitualidade ou sem volume que caracterize intuito comercial, operações de circulação
      de mercadoria, ainda que se iniciem no exterior, ou estou disopensado da emissãoda nota fiscal por força da legislação
      tributária vigente, responsabilizando-me, nos termos da lei e a quem de direito, por informações inverídicas.
      Declaro ainda que não estou postando conteúdo inflamável, explosivo, causador de combustão espontânea,
      tóxico, corrosivo, gás ou qualquer outro conteúdo que constitua perigo, conforme o art. 13 da Lei Postal nº 6.538/78.
    `, -5, 452, {
        align: "center"
      })

    const individualDate = common.getIndividualDate(param.datalog);

    doc.font('Helvetica')
      .fontSize(8)
      .text("São Paulo", 20, 525)

    doc.font('Helvetica')
      .fontSize(12)
      .text(",", 145, 525)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${individualDate.day}`, 155, 525)

    doc.font('Helvetica')
      .fontSize(8)
      .text("de", 172, 525)

    doc.font('Helvetica')
      .fontSize(7)
      .text(`${individualDate.month}`, 188, 525)

    doc.font('Helvetica')
      .fontSize(8)
      .text("de", 238, 525)

    doc.font('Helvetica')
      .fontSize(8)
      .text(`${individualDate.year}`, 254, 525)

    doc.font('Helvetica')
      .fontSize(7)
      .text("Assinatura do Declarante/Remetente", 283, 537)


    doc.font('Helvetica-Bold')
      .fontSize(8)
      .text(`OBSERVAÇÃO:`, 14, 554)

    doc.font('Helvetica')
      .fontSize(7)
      .text(`
        Constitui crime contra a ordem suprimir ou reduzir tributo, ou contribuição social e qualquer acessório
        (Lei 8.137/90 Art. 1º, V).
      `, 2, 555)
  })

  doc.end();

  await stream.on('data', chunk => {
    base64PDF += chunk;
  });

  return base64PDF;
}