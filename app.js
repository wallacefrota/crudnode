// DEVELOPED BY - WALLACE FROTA
// Instagram - @frotadev
// requerendo modulos
const express = require('express');
const app = express(); // todas as funções do express
const hbs = require('express-handlebars')
const bodyParser = require('body-parser');
const session = require('express-session')
const flash = require("req-flash");
const path = require('path');

const Post = require('./models/Post'); // tabela do bd

// config
  // sessão armazenar req flash
  app.use(session ({
      secret: "crudnode",
      resave: true,
      saveUninitialized: true
  }))
  // req-flash
  app.use(flash());
  // middleware flash
  app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      next()
  })
  // handlebars
  app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  
  // body parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  //Public Path arquivos estaticos css/bootstrap/jquery/img
  app.use(express.static(path.join(__dirname, "/public")));

// ROTAS
// cadastro exibindo formulário
app.get("/cad", (req, res) => {
    res.render('form');
})

// rota principal exibindo postagens em ordem desc
app.get('/', (req, res) => {
     Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('home', {posts: posts});
     })
})

// rota de administração das postagens
app.get('/admin', (req, res) => {
    Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
        res.render('viewpostadm', {posts: posts})
    })
})

// rota excluir postagens via admin pelo id da postagem
app.get('/deletar/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso.")
        res.redirect('/admin')
    }).catch((error) => {
        req.flash("error_msg", "Erro ao excluir postagem.")
        res.redirect('/admin')
    })
})

// rota do form de update de dados com os valores sendo exibidos ao admin
app.get('/update/:id', (req, res) => {
    Post.findOne({where: {'id': req.params.id}}).then((dados) => {
        res.render('update', {dados: dados});
    })
})

// rota atualizando dados das postagens via admin
app.post('/addupdate', (req, res) => {
    Post.findOne({where: {'id': req.body.id}}).then((dados) => {
        dados.author = req.body.author
        dados.titulo = req.body.titulo
        dados.frase = req.body.frase
        // se foi salvo redireciona
        dados.save().then(() => {
            req.flash("success_msg", "Dados atualizados com sucesso.")
            res.redirect('/admin')
        })
    }).catch((error) => {
        req.flash("error_msg", "Erro ao atualizar informações.");
        res.redirect('/admin')
    })
})


 // rota post salvando no bd
app.post('/add', (req, res) => {
    // salvando os dados dos inputs no bd com bodyParser
    Post.create({
        author: req.body.author,
        titulo: req.body.titulo,
        frase: req.body.frase
    }).then(function() { // se cadastrou com sucesso redireciona
        res.redirect('/')
    }).catch(function(error) { // se houve erro
        res.send("Ocorreu um erro ao salvar dados: " + error)
    })
})


// acesso ao servidor porta local
app.listen('8081', function() {
    console.log("Servidor conectado na porta 8081");
})