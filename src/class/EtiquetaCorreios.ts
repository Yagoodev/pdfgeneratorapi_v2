import ConstructorPDF from "../lib/ConstructorPDF";

import { EtiquetaCorreiosBodyInterface } from "../interfaces/EtiquetasInterface";

import ConstructorBarcode from "../lib/ConstructorBarcode";

export default class EtiquetaCorreios {

  public async CreateEtiqueta(data: EtiquetaCorreiosBodyInterface): Promise<string> {
    const cpdf = new ConstructorPDF();
    const cbc = new ConstructorBarcode();

    const barcode = await cbc.GenerateBarcode128();

    const options: PDFKit.Mixins.TextOptions = {
      align: "center"
    }

    cpdf.pathTranslate({ path: "M0,20H283V399H0V20Z", translate: [8, 0] });
    cpdf.path({
      paths: ["M58,208H271", "M202,224h79", "M58,225H159", "M0,330H283", "M4,229.5H281"],
      pathsFill: ["M4,231H158v13H4V231Z"]
    });

    cpdf.text({ value: data.codigoInterno, position: [-180, 50], options });
    cpdf.text({ value: data.N1, position: [-180, 58], options });
    cpdf.text({ value: data.Datalog, position: [-180, 66], options });

    cpdf.image({ imagePath: "./assets/images/datamatrix.jpg", position: [115, 25], options: { width: 60 } });
    cpdf.image({ imagePath: "./assets/images/datamatrixlogo.jpg", position: [217, 25], options: { width: 60 } });
    cpdf.text({ value: "Peso (g):", position: [230, 100] });
    cpdf.text({ value: data.peso.toString(), bold: true, position: [255, 100] });

    cpdf.text({ value: "CONTRATO: ", size: 7, position: [108, 92] });
    cpdf.text({ value: data.contrato.toString(), size: 7, bold: true, position: [150, 92] });
    cpdf.text({ value: data.modalidade, size: 7, position: [0, 102], options });
    cpdf.text({ value: data.codigoObjeto, size: 9, bold: true, position: [0, 122], options });
    // cpdf.image({ imagePath: "./assets/images/barcode1.jpg", position: [29, 138], options: { width: 235 } });
    cpdf.image({ imagePath: barcode, position: [29, 138], options: { width: 235 } });

    cpdf.text({ value: "Recebedor:", position: [25, 202] });
    cpdf.text({ value: "Assinatura:", position: [26, 219] });
    cpdf.text({ value: "Documento:", position: [168, 219] });

    cpdf.text({ value: "DESTINATÁRIO", size: 10, color: "white", bold: true, position: [46, 234] });

    cpdf.text({ value: data.destinatario.nome, size: 7, position: [10, 250] });
    cpdf.text({ value: `${data.destinatario.logradouro} ${data.destinatario.endereco}, ${data.destinatario.numero}`, size: 7, position: [10, 260] });
    cpdf.text({ value: data.destinatario.bairro, size: 7, position: [10, 270] });
    cpdf.text({ value: data.destinatario.cep, size: 7, bold: true, position: [10, 280] });
    cpdf.text({ value: `${data.destinatario.cidade}/${data.destinatario.cep}`, size: 7, position: [45, 280] });
    cpdf.image({ imagePath: "./assets/images/barcode2.jpg", position: [10, 290], options: { width: 105 } });

    cpdf.text({ value: data.remetente.nome, size: 7, position: [10, 347] });
    cpdf.text({ value: `${data.remetente.logradouro} ${data.remetente.endereco}, ${data.remetente.numero}`, size: 7, position: [10, 357] });
    cpdf.text({ value: data.remetente.bairro, size: 7, position: [10, 367] });
    cpdf.text({ value: data.remetente.cep, size: 7, bold: true, position: [10, 377] });
    cpdf.text({ value: `${data.remetente.cidade}/${data.remetente.cep}`, size: 7, position: [45, 377] });

    cpdf.image({ imagePath: "./assets/images/correios.jpg", position: [238, 232], options: { width: 40 } });

    cpdf.endDoc();

    const base64PDF = await cpdf.gerateBase64();

    return base64PDF;
  }

}