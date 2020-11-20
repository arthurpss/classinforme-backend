const connection = require('../database/connection');

module.exports = {
    async listaProdutosPorEmpresa(request, response) {
        const cnpj = request.params.cnpj;
        try {
            const produtos = await connection('produto').select('*').from('produto').where('empresa_cnpj', cnpj);
            return response.json(produtos);    
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
        
    },

    async novoProduto(request, response) {
        const empresa_cnpj = request.params.cnpj;
        const { categoria, titulo, descricao, caminho_img, caminho_video } = request.body;
        try {
            await connection('produto').insert({
                categoria, titulo, descricao, caminho_img, caminho_video, empresa_cnpj
            });
            return response.sendStatus(200);
        } catch (error) {
            console.log(error)
            return response.sendStatus(400);
        }
    }
}