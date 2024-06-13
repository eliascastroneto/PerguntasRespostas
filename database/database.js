const { Sequelize } = require("sequelize");

const connect = new Sequelize("guiaPerguntas", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

connect.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

    module.exports = connect;