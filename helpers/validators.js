import { getCurrentDate } from "./common.js";

function paramsDataValidate(dataPDF) {
  const objeto = dataPDF.objeto != "" ? dataPDF.objeto : false;

  if (!objeto) {
    return {
      success: false,
      message: "Campo OBJETO não foi infomado."
    };
  }

  const datalog = dataPDF.datalog != "" ? dataPDF.datalog : getCurrentDate(dataPDF.datalog);

  const conteudo = dataPDF.produtos.conteudo != "" ? dataPDF.produtos.conteudo : objeto;

  console.log(conteudo);

  const remetente = addressValidate(dataPDF.remetente);
  const destinatario = addressValidate(dataPDF.destinatario);

  if (!remetente.success | !destinatario.success) {
    return {
      success: false,
      message: "Dados de destinátario ou remetente inválidos."
    };
  }

  return {
    success: true,
    data: {
      objeto,
      datalog,
      produtos: {
        item: dataPDF.produtos.item,
        conteudo,
        quantidade: dataPDF.produtos.quantidade,
        valor: dataPDF.produtos.valor
      },
      remetente,
      destinatario
    }
  };
}

function addressValidate(address) {
  const nome = address.nome != "" ? address.nome : "";
  const bairro = address.bairro != "" ? address.bairro : "";
  const endereco = address.endereco != "" ? `${address.endereco}, ${bairro}` : "";
  const cidade = address.cidade != "" ? address.cidade : "";
  const cep = address.cep != "" ? address.cep : "";
  const uf = address.uf != "" ? address.uf : "";

  const isMissingArgument = (nome == "" | endereco == "" | cidade == "" | cep == "" | uf == "" | bairro == "") == 1 ? true : false;

  if (isMissingArgument) {
    return {
      success: false
    };
  }

  const cpfCnpj = address.cpfCnpj != "" ? address.cpfCnpj : "";

  return {
    success: true,
    nome,
    endereco,
    cidade,
    cep,
    uf,
    cpfCnpj
  }
}

export {
  paramsDataValidate
} 