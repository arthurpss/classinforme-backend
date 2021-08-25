const connection = require('../database/connection');
const path = require('path');

module.exports = {
    async novaImagem(request, response) {
        const produto_id = request.params.produto_id;
        const { originalname: name, size, filename: key, path: url } = request.file;

        try {
            imagem = await connection('imagem').insert({
                key, size, name, produto_id, url
            });
            return response.sendStatus(200);
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

    getImagem(request, response) {
        const imageKey = request.params.key;
        const imagePath = path.join(__dirname, "../files/uploads", imageKey);
        
        try {
            response.sendFile(imagePath);
        } catch (error) {
            console.log(error);
            response.status(400).send('Error: Image does not exists');
        }
    },

    async deletaImagem(request, response) {
        const id = request.params.produto_id;
        const key = request.body.key;

        try {
            await connection('imagem').where('produto_id', id).andWhere('key', key).del();
            return response.sendStatus(200);
        } catch (error) {
            console.log(error)
            return response.sendStatus(400);
        }
    }
}