const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const employee = sequelize.define('employees', {
    employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middleName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    contactNumber: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    companyEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    workMode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
})

module.exports = employee;