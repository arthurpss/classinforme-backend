const nodemailer = require('nodemailer');
require('dotenv').config();
const { transport_host, transport_port, transport_user, transport_pass } = process.env;

let transport = nodemailer.createTransport({
    host: transport_host,
    port: transport_port,
    auth: {
        user: transport_user,
        pass: transport_pass
    }
})

let message = {
    from: '',
    to: '',
    subject: '',
    text: ''
};

module.exports = {
    async emailContato(request, response) {
        const { razao_social, email, tipo_produto, campo_livre } = request.body;
        message.to = email;
        message.from = 'classinforme@sinfor.org.br';
        message.subject = 'Classinforme - Primeiro contato';
        message.text = `A empresa: ${razao_social}, através do email: ${email}, deseja anunciar um produto da categoria: ${tipo_produto}\nInformações adiconais: ${campo_livre}`;

        return transport.sendMail(message, (err, info) => {
            if (err) {
                response.sendStatus(404);
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        })
    },

    async emailAnuncio(request, response) {
        const { cnpj, email, plano } = request.body;
        message.to = 'lucia@sinfor.org.br';
        message.from = 'classinforme@sinfor.org.br';
        message.subject = `Novo anúncio!`;
        message.text = `A empresa dona do CNPJ ${cnpj}, com o email ${email}, cadastrou um novo anúncio na plataforma. O plano do anúncio é: ${plano}.`;

        return transport.sendMail(message, (err, info) => {
            if (err) {
                response.sendStatus(404);
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        })
    },

    async emailCadastroToAdmin(request, response) {
        const { razao_social, telefone } = request.body;
        message.to = 'lucia@sinfor.org.br';
        message.from = 'classinforme@sinfor.org.br';
        message.subject = `Nova empresa! ${razao_social}`;
        message.text = `A empresa "${razao_social}" acaba de se cadastrar na plataforma. Dê as boas vindas pelo telefone: ${telefone}`;

        return transport.sendMail(message, (err, info) => {
            if (err) {
                response.sendStatus(404);
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        })
    },

    async emailCadastroToEmpresa(request, response) {
        const { razao_social, email } = request.body;
        message.to = email;
        message.from = 'classinforme@sinfor.org.br';
        message.subject = `Bem vindo(a), ${razao_social}!`;
        message.text = `    Faça seu login utilizando o CNPJ e a senha através do link: https://classinforme.netlify.app/login 
        \n  O Sinfor te deseja boas-vindas e se dispõe a responder suas dúvidas através do email lucia@sinfor.org.br.`;

        return transport.sendMail(message, (err, info) => {
            if (err) {
                response.sendStatus(404);
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        })
    }
};