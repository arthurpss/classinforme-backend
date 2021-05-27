const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
  async novaEmpresa(request, response) {
    const { cod_sinfor, cnpj, razao_social, endereco, cidade, bairro, cep, filiado, senha } = request.body;
    const data_contato = Date.now();
    let senhaHash = "";

    try {
      await bcrypt.hash(senha, 10).then(hash => senhaHash = hash);
    } catch (error) {
      console.log(error);
      return response.sendStatus(400);
    }

    try {
      await connection('empresa').insert({
        cod_sinfor, cnpj, razao_social, endereco, cidade, bairro, cep, filiado, data_contato, senhaHash
      });
      return response.sendStatus(200);
    } catch (error) {
      console.log(error)
      return response.sendStatus(400);
    }
  },

  async listaEmpresas(request, response) {
    const empresas = await connection('empresa').select('*').from('empresa');
    return response.json(empresas);
  },

  async listaEmpresaPorCNPJ(request, response) {
    const cnpj = request.params.cnpj;
    const empresa = await connection('empresa').select('*').from('empresa').where('cnpj', cnpj).first();
    return response.json(empresa);
  },

  async listaEmpresa(cnpj) {
    const empresa = await connection('empresa').select('*').from('empresa').where('cnpj', cnpj).first();
    return empresa;
  },

  async atualizaEmpresa(request, response) {
    const cnpjAtual = request.params.cnpj;
    const { cod_sinfor, novoCnpj, razao_social, endereco, cidade, bairro, cep, filiado } = request.body;
    try {
      await connection('empresa').where('cnpj', cnpjAtual).update({
        cod_sinfor: cod_sinfor,
        cnpj: novoCnpj,
        razao_social: razao_social,
        endereco: endereco,
        cidade: cidade,
        bairro: bairro,
        cep: cep,
        filiado: filiado
      });
      return response.sendStatus(200);
    } catch (error) {
      console.log(error)
      return response.sendStatus(400);
    }
  }
};
