const db = require('./db') // arquivo que faz conexão com bd

// tabela do banco
const Post = db.sequelize.define('postagens', {
    author: {
        type: db.Sequelize.STRING
    },
    titulo: {
        type: db.Sequelize.STRING
    },
    frase: {
        type: db.Sequelize.STRING
    }
});

// Sincronizamos a tabela apenas 1º vez para criar
// depois comentar ou excluir essa parte abaixo do códido.

// Post.sync({force: true});

// exportando módulo Post
module.exports = Post