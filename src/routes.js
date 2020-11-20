const express = require('express');
const passport = require('passport');
const EmpresaController = require('./controllers/EmpresaController');
const CatalogoService = require('./services/CatalogoService');
const EmailService = require('./services/EmailService');
const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();

routes.get('/catalogo', CatalogoService.leCatalogo);

routes.post('/primeiro-contato/email', EmailService.emailContato);

routes.post('/nova-empresa', EmpresaController.novaEmpresa);
routes.get('/lista-empresas', EmpresaController.listaEmpresas);
routes.post('/login-empresa', passport.authenticate('local', {
    successRedirect: "/dashboard-empresa",
    failureRedirect: "/cadastro-empresa"
}));
routes.get('/lista-empresa/:cnpj', EmpresaController.listaEmpresaPorCNPJ);

routes.get('/produtos-empresa/:cnpj', ProdutoController.listaProdutosPorEmpresa);
routes.post('/novo-produto/:cnpj', ProdutoController.novoProduto);

module.exports = routes;
