import { generateVectorPathStrokeContent, generateVectorPathFillContent } from "./components/path.js";

import axios from "axios";
import path from "path";
import fs from "fs";

import PDFDocument from "pdfkit";
import pdf2base64 from "pdf-to-base64";
import jsdom from "jsdom";

async function translateHTMLToPNG(dados) {

  const doc = new PDFDocument({ size: "A6" });

  const { JSDOM } = jsdom;

  const spaceBetweenAddressInfo = {
    name: 250,
    zip: 262,
    address: 274,
    complement: 284,
    district: 294,
    city: 304,
    fu: 314,
    reference: 324
  }

  const request = await axios.get(`https://pudo-api.pontodrops.com.br/orders/api/v1/orders/${dados.objeto}/label_raw_html`, {
    headers: {
      "X-Api-Key": dados.token
    }
  })

  const dom = new JSDOM(request.data);

  const modalidade = (dom.window.document.getElementsByTagName('td')[1].textContent).trim(); // Bloco da modalidade
  const remententeSuperior = (dom.window.document.getElementsByTagName('p')[0].textContent).trim(); // Remetente da parte superior
  const blocoEsquerdo = (dom.window.document.getElementsByTagName('td')[11].textContent).trim(); // Bloco do meio lado esquerdo
  const blocoDireito = (dom.window.document.getElementsByTagName('td')[12].textContent).trim(); // Bloco do meio lado direito
  const vencimentoPostagem = (dom.window.document.getElementsByTagName('p')[2].textContent).trim(); // Vencimento da postagem
  const enderecoRemetente = (dom.window.document.getElementsByTagName('p')[3].textContent).trim(); // Endereço remetente

  const codigoDeBarras = (dom.window.document.getElementsByTagName('img')[3].src); // Código de barras
  const codigoQR = (dom.window.document.getElementsByTagName('img')[4].src); // Código de barras

  // fs.writeFile("out.jpg", codigoDeBarras, 'base64', function (err) {
  //   console.log(err);
  // });

  const arrDataVencimento = vencimentoPostagem.split(" ");
  const arrRemententeSuperior = remententeSuperior.split(" ");

  const arrFiltered = arrDataVencimento.filter(item => {
    return item != "";
  })

  const vecimentoData = arrFiltered[arrFiltered.length - 1];

  const vectorFill = [
    "M14.878,19.684H282.59V57.755H14.878V19.684Z",
    "M14.068,214.9h176.99v28.756H14.068V214.9Z",
    "M192.78,215.1h89.707v28.755H192.78V215.1Z"
  ];



  const vectorStroke = [
    "M15.283,133.492H282.59",
    "M15.688,156.578H283",
    "M148.734,133.493V59.351",
    "M14.473,334.983H283"
  ]

  generateVectorPathFillContent(doc, vectorFill);
  generateVectorPathStrokeContent(doc, vectorStroke);

  doc.font('Helvetica')
    .fontSize(16)
    .fillColor('white')
    .text(`${modalidade}`, 66, 34, {
      width: "200px"
    })

  doc.image("./assets/images/logo-drops.png", 55, 65, {
    width: 60
  })

  doc.font('Helvetica')
    .fontSize(12)
    .fillColor('black')
    .text(`${arrRemententeSuperior[0]}${arrRemententeSuperior[1]}\n${arrRemententeSuperior[2]}\n${arrRemententeSuperior[3]}`, 25, 86, {
      width: 120,
      align: "center",
      lineGap: 2.2
    })

  doc.font('Helvetica')
    .fontSize(9)
    .fillColor('black')
    .text(`Transportadora:`, 185, 75, {
      width: "120px"
    })

  doc.image("./assets/images/logo-sequoia.png", 176, 90, {
    width: 80
  })

  doc.font('Helvetica-Bold')
    .fontSize(9)
    .fillColor('black')
    .text(`Pedido: ${dados.postagem.codigoInterno}`, 100, 143, {
      width: "120px"
    })


  doc.image(codigoDeBarras, 12, 165, {
    width: 275
  })

  doc.font('Helvetica')
    .fontSize(9)
    .fillColor('black')
    .text(`${dados.objeto}`, 114, 200, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(14)
    .fillColor('white')
    .text(`${blocoEsquerdo}`, 75, 225, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(14)
    .fillColor('white')
    .text(`${blocoDireito}`, 226, 225, {
      width: "120px"
    })




  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Destinatário: ', 14, spaceBetweenAddressInfo.name, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('CEP: ', 14, spaceBetweenAddressInfo.zip, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Endereço: ', 14, spaceBetweenAddressInfo.address, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Complemento : ', 14, spaceBetweenAddressInfo.complement, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Bairro: ', 14, spaceBetweenAddressInfo.district, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Cidade: ', 14, spaceBetweenAddressInfo.city, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('UF: ', 14, spaceBetweenAddressInfo.fu, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(8)
    .fillColor('black')
    .text('Referência: ', 14, spaceBetweenAddressInfo.reference, {
      width: "120px"
    })



  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.destinatario}`, 120, spaceBetweenAddressInfo.name, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.cep}`, 120, spaceBetweenAddressInfo.zip, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.endereco}`, 120, spaceBetweenAddressInfo.address, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.complemento}`, 120, spaceBetweenAddressInfo.complement, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.bairro}`, 120, spaceBetweenAddressInfo.district, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.cidade}`, 120, spaceBetweenAddressInfo.city, {
      width: "120px"
    })
  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.uf}`, 120, spaceBetweenAddressInfo.fu, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(8)
    .fillColor('black')
    .text(`${dados.postagem.referência}`, 120, spaceBetweenAddressInfo.reference, {
      width: "120px"
    })



  doc.font('Helvetica-Bold')
    .fontSize(6)
    .fillColor('black')
    .text('Vencimento da Postagem: ', 14, 340, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(6)
    .fillColor('black')
    .text(`${vecimentoData}`, 90, 340, {
      width: "120px"
    })

  doc.font('Helvetica-Bold')
    .fontSize(9)
    .fillColor('black')
    .text('LOCAL DE POSTAGEM:', 14, 354, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(7)
    .fillColor('black')
    .text(`${remententeSuperior}`, 14, 364, {
      width: "60px"
    })

  doc.font('Helvetica')
    .fontSize(7)
    .fill("red")
    .fillColor('black')
    .text(`${enderecoRemetente}`, 14, 374, {
      width: "60px",
      lineBreak: true
    })

  doc.font('Helvetica-Bold')
    .fontSize(7)
    .fillColor('black')
    .text('REMETENTE:', 14, 384, {
      width: "120px"
    })

  doc.font('Helvetica')
    .fontSize(7)
    .fillColor('black')
    .text(`${dados.postagem.remetente}`, 14, 394, {
      width: "120px"
    })

  doc.image(codigoQR, 220, 340, {
    width: 60
  })

  doc.end();

  doc.pipe(fs.createWriteStream(`./temp/${dados.objeto}.pdf`));
}

async function convertToBase64({ objeto }) {
  let base64 = await pdf2base64(path.join(`./temp/${objeto}.pdf`));

  return base64;
}

export {
  translateHTMLToPNG,
  convertToBase64
}