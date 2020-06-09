const Post = require('../models/Post'); // tabela do bd

module.exports = {
    async create(req, res) {
        const {author, titulo, frase} = req.body;
        // salvando os dados dos inputs no bd com bodyParser
        Post.create({
            author: author,
            titulo: titulo,
            frase: frase
        }).then(function() { // se cadastrou com sucesso redireciona
            res.redirect('/')
        }).catch(function(error) { // se houve erro
            res.send("Ocorreu um erro ao salvar dados: " + error)
        })
    },
    async index(req, res) {
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            res.render('home', {
                posts: posts.map(post => post.toJSON())
            });
        })
    },
    async admin(req, res) {
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            res.render('viewpostadm', {
                posts: posts.map(post => post.toJSON())
            })
        })
    },
    async delete(req, res) {
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            req.flash("success_msg", "Postagem deletada com sucesso.")
            res.redirect('/admin')
        }).catch((error) => {
            req.flash("error_msg", "Erro ao excluir postagem.")
            res.redirect('/admin')
        })
    },
    async updateAdmin(req, res) {
        Post.findOne({where: {'id': req.params.id}}).then((dados) => {
            res.render('update', { dados: dados.toJSON()});
        })
    },
    async update(req, res) {
        const {author, titulo, frase} = req.body;

        Post.findOne({where: {'id': req.body.id}}).then((dados) => {
            dados.author = author
            dados.titulo = titulo
            dados.frase = frase
            // se foi salvo redireciona
            dados.save().then(() => {
                req.flash("success_msg", "Dados atualizados com sucesso.")
                res.redirect('/admin')
            })
        }).catch(() => {
            req.flash("error_msg", "Erro ao atualizar informações.");
            res.redirect('/admin')
        })
    }
}