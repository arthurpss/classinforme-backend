const { response } = require('express');
const connection = require('../database/connection');

module.exports = {
    async listaAnunciosPorEmpresa(request, response) {
        const cnpj = request.params.cnpj;
        try {
            const anuncios = await connection('anuncio')
                .join('produto', 'anuncio.produto_id', 'produto.produto_id')
                .select('*').where('produto.empresa_cnpj', cnpj);
            console.log(anuncios);
            return response.json(anuncios);
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async listaAnuncios(request, response) {
        try {
            const anuncios = await connection('anuncio').select('*').from('anuncio');
            return response.json(anuncios);
        } catch (error) {
            console.log(error)
        }
    },

    async novoAnuncio(request, response) {
        const plano = request.params.plano;
        const { produto_id, email } = request.body;
        const ativo = false
        try {
            await connection('anuncio').insert({
                produto_id, plano, email, ativo
            });
            return response.sendStatus(200);
        } catch (error) {
            console.log(error)
            return response.sendStatus(400);
        }
    }
}