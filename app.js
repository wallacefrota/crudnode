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
// rotas
const routes = require('./src/routes');

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
  app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/src/views/layouts/'}));
  app.set('views', path.join(__dirname, 'src', 'views'));
  app.set('view engine', 'hbs');
  
  // body parser
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  //Public Path arquivos estaticos css/bootstrap/jquery/img
  app.use(express.static(path.join(__dirname, "/public")));

  // rotas
  app.use('/', routes);

// acesso ao servidor porta local
app.listen('8081', function() {
    console.log("Servidor conectado na porta 8081");
})