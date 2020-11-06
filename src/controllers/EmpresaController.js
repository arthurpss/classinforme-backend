const connection = require('../database/connection');

module.exports = {
  async novaEmpresa(request, response) {
    const {cod_sinfor, cnpj, razao_social, endereco, cidade, bairro, cep, filiado, data_contato} = request.body;

    await connection('empresa').insert({
      cod_sinfor, cnpj, razao_social, endereco, cidade, bairro, cep, filiado, data_contato
    });

    return response.json({cnpj, razao_social});
  },

  async listaEmpresas(request, response) {
    const empresas = await connection('empresa').select('*').from('empresa');
    return response.json(empresas);
  }
};
