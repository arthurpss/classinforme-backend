const connection = require('../database/connection');

module.exports = {
    async novaImagem(request, response) {
        const produto_id = request.params.produto_id;
        const { originalname: name, size, filename: key, path: url } = request.file;

        try {
            imagem = await connection('imagem').insert({
                key, size, name, produto_id, url
            });
            return response.json(imagem);
        } catch (error) {
            console.log(error)
            return response.sendStatus(400);
        }
    },

    async getImages(request, response) {
        const images = await connection('imagem').select('*').from('imagem');
        return response.json(images);
    },

    async getImagesByProdutoId(request, response) {
        const id = request.params.produto_id;

        try {
            const images = await connection('imagem').select('*').from('imagem').where('produto_id', id);
            return response.json(images);
        } catch (e) {
            console.log(e);
            return response.json(500);
        }

    },


}