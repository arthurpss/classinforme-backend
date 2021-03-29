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


//Catalogo
routes.get('/catalogo', CatalogoService.leCatalogo);

//Email
routes.post('/primeiro-contato/email', EmailService.emailContato);

//Empresas
routes.post('/nova-empresa', EmpresaController.novaEmpresa);
routes.get('/lista-empresas', EmpresaController.listaEmpresas);
routes.post('/login-empresa', passport.authenticate('local', {
    failureFlash: "Falha no login.",
    successFlash: "Login realizado."
})
    , (req, res) => {
        req.user ? res.sendStatus(200) : res.sendStatus(401)
    }
)
routes.get('/lista-empresa/:cnpj', EmpresaController.listaEmpresaPorCNPJ);

//Produtos
routes.get('/produtos-empresa/:cnpj', ProdutoController.listaProdutosPorEmpresa);
routes.get('/produto-id/:id', ProdutoController.listaProdutoPorId);
routes.post('/novo-produto/:cnpj', ProdutoController.novoProduto);

//Imagens
routes.post('/nova-imagem/:produto_id', multer(multerConfig).single("file"), ImagemController.novaImagem);
routes.get('/lista-imagens', ImagemController.getImages);
routes.get('/lista-imagens/:produto_id', ImagemController.getImagesByProdutoId);

//Anúncios
routes.post('/novo-anuncio/:cnpj/:plano', AnuncioController.novoAnuncio);
routes.get('/anuncios-empresa/:cnpj', AnuncioController.listaAnunciosPorEmpresa);
routes.get('/anuncios', AnuncioController.listaAnuncios);
routes.get('/anuncios-ativos', AnuncioController.listaAnunciosAtivos);
routes.patch('/altera-anuncio/:id', AnuncioController.ativaDesativaAnuncio);

module.exports = routes;
