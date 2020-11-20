const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5b8ebf080c688d",
        pass: "b20578aea2803d"
    }
});

let message = {
    from: 'classinforme@sinfor.com',
    to: 'teste@email.com',
    subject: 'Classinforme - Primeiro contato',
    text: ''
};

const messageTest = {
    from: 'classinforme@sinfor.com', // Sender address
    to: 'teste@email.com',         // List of recipients
    subject: 'Classinforme - Primeiro contato', // Subject line
    text: 'Teste' // Plain text body
};

module.exports = {
    async emailContato(request, response) {
        const { razao_social, email, tipo_produto, campo_livre } = request.body;
        message.text = `A empresa: ${razao_social}, através do email: ${email}, deseja anunciar um produto da categoria: ${tipo_produto}\n${campo_livre}`;

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