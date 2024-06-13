// <%- include('partials/header.ejs') %>
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
//const connect = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


// paginas static
app.set('view engine', 'ejs')
app.use(express.static('public'));
 
// bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// ROTAS
app.get('/', function(req,res){
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']  //ASC crescente || DESC decrecente
    ]}).then(perguntas => {
        res.render('index', {perguntas: perguntas});
    })

})

app.get('/pergunta',(req, res) => {
    res.render('perguntar');
})

app.post('/salvarpergunta',(req, res) => {
        var titulo =  req.body.titulo;
        var descricao = req.body.descricao;

        Pergunta.create({
            titulo: titulo,
            descricao: descricao

        }).then(()=>{
            res.redirect('/');
        })
})

app.post('/salvarresposta', (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    console.log(perguntaId)

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{

        res.redirect('/pergunta/'+perguntaId);
    })
})


app.get('/pergunta/:id',(req, res) => {
    var valor = req.params.id;

    Pergunta.findOne({
        where: {id: valor}
    }).then((pergunta) => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaID: valor},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })

        }else{
            res.redirect('/');

        }
    })

})


app.listen(4000,()=>{
    console.log("Servidor rodando na porta 4000")
});