const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

// verificando conexão com o bd
sequelize.authenticate().then(function() {
    console.log("Conexão com BD, realizada com Sucesso!");
}).catch(function(error) {
    console.log("Erro ao se conectar ao BD: " + error);
})
// exportando o modulo de conexão
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}