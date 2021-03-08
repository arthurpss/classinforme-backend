const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const EmpresaController = require('./controllers/EmpresaController');

module.exports = function (passport) {
    passport.serializeUser((user, done) => done(null, user.cnpj));

    passport.deserializeUser(async (cnpj, done) => await EmpresaController.listaEmpresa(cnpj, (err, user) => {
        if (err) {
            return done(null, err);
        } else {
            return done(null, user);
        }
    }));

    passport.use(new LocalStrategy({
        usernameField: 'cnpj',
        passwordField: 'senha'
    },
        function (cnpj, senha, done) {
            console.log(cnpj, senha);
            try {
                EmpresaController.listaEmpresa(cnpj).then(user => {
                    if (!user) {
                        return done(null, false, { message: "Empresa não existe" });
                    }
                    try {
                        if (bcrypt.compareSync(senha, user.senhaHash)) {
                            console.log("Login realizado");
                            return done(null, user);
                        } else {
                            console.log("Senha errada");
                            return done(null, false, { message: "Senha incorreta" });
                        }
                    } catch (e) {
                        console.log(e);
                        return done(e);
                    }
                });
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    ));

}