const routes = require('express').Router();
const passport = require('passport');
const multer = require('multer');
const EmpresaController = require('./controllers/EmpresaController');
const CatalogoService = require('./services/CatalogoService');
const EmailService = require('./services/EmailService');
const ProdutoController = require('./controllers/ProdutoController');
const AnuncioController = require('./controllers/AnuncioController');

const multerConfig = require('./multer');
const ImagemController = require('./controllers/ImagemController');
const jwtService = require('./services/JwtService');

//Catalogo
routes.get('/catalogo', CatalogoService.leCatalogo);

//Email
routes.post('/primeiro-contato/email', EmailService.emailContato);

//Empresas
routes.post('/empresa', EmpresaController.novaEmpresa);
routes.get('/empresas', EmpresaController.listaEmpresas);
routes.get('/empresa/:cnpj', EmpresaController.listaEmpresaPorCNPJ);
routes.patch('/empresa/:cnpj', EmpresaController.atualizaEmpresa);

//Login-empresa
routes.post('/login', passport.authenticate('local'), jwtService.login);
routes.post('/token', jwtService.getAccessToken);
routes.post('/logout', jwtService.verifyJWT, jwtService.logout);

//Produtos
routes.get('/produtos/:cnpj', jwtService.verifyJWT, ProdutoController.listaProdutosPorEmpresa);
routes.get('/produto/:id', ProdutoController.listaProdutoPorId);
routes.post('/produto/:cnpj', jwtService.verifyJWT, ProdutoController.novoProduto);

//Imagens
routes.post('/imagem/:produto_id', multer(multerConfig).single("file"), ImagemController.novaImagem);
routes.get('/imagens', ImagemController.getImages);
routes.get('/imagens/:produto_id', ImagemController.getImagesByProdutoId);
routes.get('/imagem/:key', ImagemController.getImagem);

//Anúncios
routes.post('/anuncio/:cnpj/:plano', jwtService.verifyJWT, AnuncioController.novoAnuncio);
routes.get('/anuncios/:cnpj', AnuncioController.listaAnunciosPorEmpresa);
routes.get('/anuncios', AnuncioController.listaAnuncios);
routes.get('/anuncios-ativos', AnuncioController.listaAnunciosAtivos);
routes.patch('/anuncio/:id', AnuncioController.ativaDesativaAnuncio);

module.exports = routes;
