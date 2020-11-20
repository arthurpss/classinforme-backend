const connection = require('../database/connection');

module.exports = {
    async listaProdutosPorEmpresa(request, response) {
        const cnpj = request.params.cnpj;
        try {
            const produtos = await connection('produto').where('empresa_cnpj', cnpj).select('*');
            console.log(produtos)
            return response.json(produtos);    
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
        
    },

    async novoProduto(request, response) {
        const empresa_param = request.params.cnpj;
        const { categoria, titulo, descricao, caminho_img, caminho_video, empresa_cnpj } = request.body;
        if (empresa_param === empresa_cnpj) {
            try {
                await connection('produto').insert({
                    categoria, titulo, descricao, caminho_img, caminho_video, empresa_cnpj
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