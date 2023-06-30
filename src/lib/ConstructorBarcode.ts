import bwipjs from 'bwip-js';

export default class ConstructorBarcode {

  public async GenerateBarcode128() {
    try {

      const objeto = "TE814451877BR";

      const buffer = await bwipjs.toBuffer({
        bcid: "code128",
        text: objeto
      });

      const buf = Buffer.from(buffer).toString('base64');

      return buffer;

    } catch (error) {

    }
  }

  public GenerateDatamatrix() {

  }

}