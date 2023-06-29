import PDFDocument from "pdfkit";

import { Base64Encode } from "base64-stream";

export default class ConstructorPDF {

  doc = null;
  stream = null;

  constructor() {
    this.doc = new PDFDocument({ margins: { top: 200, left: 0, bottom: 0, right: 0 }, size: "A6" });
    this.stream = this.doc.pipe(new Base64Encode());
  }

  text({ value = "", size = 8, position = [0, 0] }, options = {}) {
    this.doc.font('Helvetica')
      .fontSize(size)
      .text(value, position[0], position[1], options);
  }

  path({ paths = [], pathsFill = [] }) {
    if (paths.length > 0) {
      paths.map(path => {
        this.doc.path(path.toString())
          .stroke()
      })
    }

    if (pathsFill.length > 0) {
      pathsFill.map(path => {
        this.doc.path(path)
          .fill()
      })
    }
  }

  pathTranslate({ path = [], translate = [0, 0] }) {
    this.doc.path(path)
      .translate(translate[0], translate[1])
      .stroke()
  }

  endDoc() {
    this.doc.end();
  }

  async gerateBase64() {
    let base64PDF = "";

    await this.stream.on('data', chunk => {
      base64PDF += chunk;
    });

    return base64PDF;
  }

}
