import PDFDocument from "pdfkit";

import { Base64Encode } from "base64-stream";

import {
  TextInterface,
  ImageInterface,
  PathInterface,
  PathTranslateInterface
} from "../interfaces/ConstructorPDFInterface";

export default class ConstructorPDF {

  private doc: PDFKit.PDFDocument;
  private stream: Base64Encode;

  public constructor() {
    const doc = new PDFDocument({ margins: { top: 200, left: 0, bottom: 0, right: 0 }, size: "A6" });
    const stream = doc.pipe(new Base64Encode());

    this.doc = doc;
    this.stream = stream;
  }

  public text({ value="", size=6, color="black", bold=false, position=[0, 0], options={} }: TextInterface): void {
    const doc = this.doc;

    const font = doc.font(bold ? "Helvetica-Bold" : "Helvetica");

    font.fontSize(size);
    font.fillColor(color);
    font.text(value, position[0], position[1], options);
  }

  public image({ imagePath="", position=[0, 0], options={} }: ImageInterface) {
    const doc = this.doc;

    doc.image(imagePath, position[0], position[1], options);
  }

  public path({ paths, pathsFill }: PathInterface): void {
    const doc = this.doc;

    if (paths.length > 0) {
      paths.map(item => {
        const path = doc.path(item)
        path.stroke();
      })
    }

    if (pathsFill.length > 0) {
      pathsFill.map(item => {
        const path = doc.path(item)
        path.fill();
      })
    }
  }

  public pathTranslate({ path="", translate=[0, 0] }: PathTranslateInterface) {
    const doc = this.doc;

    const docPath = doc.path(path)

    docPath.translate(translate[0], translate[1]);
    docPath.stroke();
  }

  public endDoc() {
    this.doc.end();
  }

  public async gerateBase64() {
    const stream = this.stream;

    let base64PDF = "";

    await stream.on('data', chunk => {
      base64PDF += chunk;
    });

    return base64PDF;
  }

}