const express = require('express');
const EmpresaController = require('./controllers/EmpresaController');

const routes = express.Router();

routes.post('/nova-empresa', EmpresaController.novaEmpresa);
routes.get('/lista-empresas', EmpresaController.listaEmpresas);

module.exports = routes;
