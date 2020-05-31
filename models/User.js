const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

module.exports = User;