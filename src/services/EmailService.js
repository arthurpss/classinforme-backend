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
    from: 'sinfor.classinforme@gmail.com',
    to: '',
    subject: 'Classinforme - Primeiro contato',
    text: ''
};

module.exports = {
    async emailContato(request, response) {
        const { razao_social, email, tipo_produto, campo_livre } = request.body;
        message.to = email;
        message.text = `A empresa: ${razao_social}, através do email: ${email}, deseja anunciar um produto da categoria: ${tipo_produto}\nInformações adiconais: ${campo_livre}`;

        return transport.sendMail(message, function (err, info) {
            if (err) {
                response.sendStatus(404);
                console.log(err);
            } else {
                response.sendStatus(200);
                console.log(info);
            }
        })
    }
};