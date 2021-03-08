const express = require('express');
const passport = require('passport');
const EmpresaController = require('./controllers/EmpresaController');
const CatalogoService = require('./services/CatalogoService');
const EmailService = require('./services/EmailService');
const ProdutoController = require('./controllers/ProdutoController');
const AnuncioController = require('./controllers/AnuncioController');

const routes = express.Router();

routes.get('/catalogo', CatalogoService.leCatalogo);

routes.post('/primeiro-contato/email', EmailService.emailContato);

routes.post('/nova-empresa', EmpresaController.novaEmpresa);
routes.get('/lista-empresas', EmpresaController.listaEmpresa);
routes.post('/login-empresa', passport.authenticate('local', {
    // successRedirect: "/dashboard-empresa",
    // failureRedirect: "/cadastro-empresa",
    // failureFlash: true
}))
routes.get('/login-empresa', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});

routes.get('/lista-empresa/:cnpj', EmpresaController.listaEmpresaPorCNPJ);

routes.get('/produtos-empresa/:cnpj', ProdutoController.listaProdutosPorEmpresa);
routes.get('/produto-id/:id', ProdutoController.listaProdutoPorId);
routes.post('/novo-produto/:cnpj', ProdutoController.novoProduto);

routes.post('/novo-anuncio/:cnpj/:plano', AnuncioController.novoAnuncio);
routes.get('/anuncios-empresa/:cnpj', AnuncioController.listaAnunciosPorEmpresa);
routes.get('/anuncios', AnuncioController.listaAnuncios);
routes.get('/anuncios-ativos', AnuncioController.listaAnunciosAtivos);
routes.patch('/altera-anuncio/:id', AnuncioController.ativaDesativaAnuncio);

module.exports = routes;
