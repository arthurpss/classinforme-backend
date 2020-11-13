const express = require('express');
const EmpresaController = require('./controllers/EmpresaController');
const CatalogoService = require('./services/CatalogoService');

const routes = express.Router();

routes.post('/nova-empresa', EmpresaController.novaEmpresa);
routes.get('/lista-empresas', EmpresaController.listaEmpresas);
routes.get('/catalogo', CatalogoService.leCatalogo)

module.exports = routes;
