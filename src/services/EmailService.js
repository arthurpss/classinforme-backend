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
    from: '',
    to: '',
    subject: '',
    text: ''
};

const messageTest = {
    from: 'classinforme@sinfor.com', // Sender address
    to: 'teste@email.com',         // List of recipients
    subject: 'Classinforme - Primeiro contato', // Subject line
    text: 'Teste' // Plain text body
};

module.exports = {
    emailContato(request, response) {
        const { from, to, subject, text } = request.body;
        message.from = from;
        message.to = to;
        message.subject = subject;
        message.text = text;

        return transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                response.sendStatus(200);
            }
        })
    }
};