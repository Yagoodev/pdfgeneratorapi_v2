import { Request, Response } from "express";

import { EtiquetaCorreiosBodyInterface } from "../interfaces/EtiquetasInterface";

import EtiquetaCorreios from "../class/EtiquetaCorreios";

export class EtiquetasController {

  public async EtiquetaCorreios(request: Request, response: Response) {

    const bodyData: EtiquetaCorreiosBodyInterface = request.body;

    const correios = new EtiquetaCorreios();

    const etiquetaBase64 = await correios.CreateEtiqueta(bodyData);

    return response.json({
      etiqueta: etiquetaBase64
    });
    
  }

  public async EtiquetaDrops(request: Request, response: Response) {

  }

}