// config
const express = require('express');
const routes = express.Router();
// importando controller de rotas
const PostController = require('./controllers/PostController');

// ROTAS
// rota principal exibindo postagens em ordem desc
routes.get('/', PostController.index);

// cadastro exibindo formulário
routes.get("/cadastro", (req, res) => {
    res.render('form');
})

// rota de administração das postagens
routes.get('/admin', PostController.admin);

// rota excluir postagens via admin pelo id da postagem
routes.get('/deletar/:id', PostController.delete)

// rota do form de update de dados com os valores sendo exibidos ao admin
routes.get('/update/:id', PostController.updateAdmin)

// rota atualizando dados das postagens via admin
routes.post('/addupdate', PostController.update)

 // rota post salvando no bd
routes.post('/add', PostController.create)

// exportando rotas
module.exports = routes;