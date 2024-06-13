const { Sequelize } = require("sequelize");
const connect = require("./database")


const Resposta = connect.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => {

});

module.exports = Resposta;

