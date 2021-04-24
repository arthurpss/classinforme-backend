const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens = [];
generateToken = (cnpj) => {
    const token = jwt.sign({ cnpj }, process.env.jwt_secret, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = {
    login(req, res) {
        if (req.user) {
            let cnpj = req.user.cnpj;
            const token = generateToken(cnpj);
            const refreshToken = jwt.sign({ cnpj }, process.env.jwt_secret);
            refreshTokens.push(refreshToken);

            res.json({ auth: true, token: token, refreshToken: refreshToken, cnpj })
        } else { res.sendStatus(401) }
    },

    verifyJWT(req, res, next) {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.jwt_secret, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.userId = decoded.id;
            next();
        });
    },

    getAccessToken(req, res) {
        const refreshToken = req.body.refreshToken;
        if (refreshToken == null) return res.status(401).json({ auth: false, message: 'No token provided.' });
        if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: 'Refresh token error.' })
        jwt.verify(refreshToken, process.env.jwt_secret, (err, decoded) => {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            cnpj = decoded.cnpj
            const token = generateToken(cnpj);
            res.json({ auth: true, token: token, cnpj });
        })
    },

    logout(req, res) {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.json({ auth: false, token: null });
    }
}