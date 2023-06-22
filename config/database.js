const Sequelize = require('sequelize');

module.exports = new Sequelize('empsdb', 'root', 'rootpassword', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});