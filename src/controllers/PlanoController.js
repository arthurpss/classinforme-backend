const connection = require('../database/connection');

module.exports = {
    async listaPlanos(request, response) {
        try {
            const planos = await connection('plano').select('*');
            return response.json(planos);
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async listaPlanoPorId(request, response) {
        const id = request.params.id;
        try {
            const plano = await connection('plano').select('*').where('plano_id', id).first();
            return response.json(plano);
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async listaPlanosAtivos(request, response) {
        try {
            const planos = await connection('plano').select('*').from('plano').where('ativo', 1);
            return response.json(planos);
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async novoPlano(request, response) {
        const { preco, titulo, descricao, ativo, tipo } = request.body;
        try {
            await connection('plano').insert({
                preco, titulo, descricao, ativo, tipo
            });
            return response.sendStatus(200);
        } catch (error) {
            console.log(error)
            return response.json(500)
        }
    },

    async atualizaPlano(request, response) {
        const id = request.params.id;
        const { preco, titulo, descricao, ativo, tipo } = request.body;
        try {
            await connection('plano').where('plano_id', id).update({
                preco: preco,
                titulo: titulo,
                descricao: descricao,
                ativo: ativo,
                tipo: tipo
            });
            return response.sendStatus(200);
        } catch (error) {
            console.log(error)
            return response.sendStatus(500);
        }
    }
    /* 
    async ativaDesativaPlano(request, response) {
        const id = request.params.id;
        const ativar = request.body.ativar;
        try {
            const plano = await connection('plano').where('plano_id', id).update('ativo', ativar);
            // return response.sendStatus(200);
            return response.json(plano);
        } catch (error) {
            console.log(error);
            return response.sendStatus(400);
        }
    } */
}