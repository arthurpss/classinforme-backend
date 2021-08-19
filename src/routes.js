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
const PlanoController = require('./controllers/PlanoController');

//Catalogo
routes.get('/catalogo', CatalogoService.leCatalogo);

//Emails
routes.post('/primeiro-contato/email', EmailService.emailContato);
routes.post('/anuncio/email', EmailService.emailAnuncio);
routes.post('/cadastro-admin/email', EmailService.emailCadastroToAdmin);
routes.post('/cadastro-empresa/email', EmailService.emailCadastroToEmpresa);

//Empresas
routes.post('/empresa', EmpresaController.novaEmpresa);
routes.get('/empresas', EmpresaController.listaEmpresas);
routes.get('/empresa/:cnpj', EmpresaController.listaEmpresaPorCNPJ);
routes.patch('/empresa/:cnpj', EmpresaController.atualizaEmpresa);
routes.patch('/empresaAdmin/:cnpj', EmpresaController.atualizaEmpresaAdmin);

//Login-empresa
routes.post('/login', passport.authenticate('local'), jwtService.login);
routes.post('/token', jwtService.getAccessToken);
routes.post('/logout', jwtService.verifyJWT, jwtService.logout);

//Produtos
routes.get('/produtos/:cnpj', jwtService.verifyJWT, ProdutoController.listaProdutosPorEmpresa);
routes.get('/produto/:id', ProdutoController.listaProdutoPorId);
routes.post('/produto/:cnpj', jwtService.verifyJWT, ProdutoController.novoProduto);
routes.patch('/produto/:id', jwtService.verifyJWT, ProdutoController.atualizaProduto);

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
routes.get('/anuncios-tipo', AnuncioController.listaAnunciosPorTipo);
routes.patch('/anuncio/:id', AnuncioController.ativaDesativaAnuncio);

//Planos
routes.post('/plano', jwtService.verifyJWT, PlanoController.novoPlano);
routes.get('/planos', PlanoController.listaPlanos);
routes.get('/planos-ativos', PlanoController.listaPlanosAtivos);
routes.get('/plano/:id', PlanoController.listaPlanoPorId);
routes.patch('/plano/:id', PlanoController.atualizaPlano);
// routes.patch('/plano/:id', AnuncioController.ativaDesativaAnuncio);


module.exports = routes;
