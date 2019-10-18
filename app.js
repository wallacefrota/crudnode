// requerendo modulos
const express = require('express');
const app = express(); // todas as funções do express
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const Post = require('./models/Post'); // tabela do bd

// config
  // handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'})); // main arquivo principal, estrutura HTML
  app.set('view engine', 'handlebars');
  // body parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  //Path arquivos estaticos css/bootstrap/jquery/img
  app.use(express.static(path.join(__dirname, "public")));

// ROTAS
 // rota principal exibindo postagens
 app.get('/', (req, res) => {
     res.render('home');
 })

 // cadastro exibindo formulário
app.get("/cad", (req, res) => {
    res.render('form');
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