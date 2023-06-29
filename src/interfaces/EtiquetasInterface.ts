type EnderecoType = {
  nome: string;
  logradouro: string;
  endereco: string;
  numero: number;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
}

export interface EtiquetaCorreiosBodyInterface {
  N1: string;
  codigoInterno: string;
  codigoObjeto: string;
  contrato: number;
  modalidade: string;
  Datalog: string;
  peso: number;
  remetente: EnderecoType
  destinatario: EnderecoType
}