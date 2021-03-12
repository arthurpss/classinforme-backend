const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const EmpresaController = require('./controllers/EmpresaController');

module.exports = function (passport) {
    passport.serializeUser((user, done) => done(null, user.cnpj));

    passport.deserializeUser((cnpj, done) => {
        try {
            EmpresaController.listaEmpresa(cnpj).then(user => done(null, user))
        } catch {
            return done(null, false)
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'cnpj',
        passwordField: 'senha',
        session: true
    },
        function (cnpj, senha, done) {
            console.log(cnpj, senha);
            try {
                EmpresaController.listaEmpresa(cnpj).then(user => {
                    if (!user) {
                        console.log("Empresa não existe")
                        return done(null, false, { message: "Empresa não existe" });
                    } else {
                        try {
                            if (bcrypt.compareSync(senha, user.senhaHash)) {
                                console.log("Login realizado");
                                return done(null, user);
                            } else {
                                console.log("Senha errada");
                                return done(null, false, { message: "Senha incorreta" });
                            }
                        } catch (e) {
                            console.log("Erro na verificação de senha:", e);
                            return done(null, false, { message: "Falha ao verificar senha" });
                        }
                    }
                });
            } catch (error) {
                console.log(error);
                return done(null, false, { message: "Empresa não encontrada" });
            }
        }
    ));
}