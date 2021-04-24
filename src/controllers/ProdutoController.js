const connection = require('../database/connection');

module.exports = {
    async listaProdutosPorEmpresa(request, response) {
        const cnpj = request.params.cnpj;
        try {
            const produtos = await connection('produto').where('empresa_cnpj', cnpj).select('*');
            return response.json(produtos);    
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async listaProdutoPorId(request, response) {
        const id = request.params.id;
        try {
            const produto = await connection('produto').select('*').where('produto_id', id).first();
            return response.json(produto);    
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async novoProduto(request, response) {
        const empresa_param = request.params.cnpj;
        const thumbnail_url = "";
        const { produto_id, categoria, titulo, descricao, empresa_cnpj } = request.body;
        if (empresa_param === empresa_cnpj) {
            try {
                await connection('produto').insert({
                    produto_id, categoria, titulo, descricao, empresa_cnpj, thumbnail_url
                });
                return response.sendStatus(200);
            } catch (error) {
                return response.sendStatus(400);
            }
        }
        else {
            return response.sendStatus(500);
        }   
    }
}