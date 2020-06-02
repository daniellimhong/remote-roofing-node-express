const Sequelize = require('sequelize');
const db = require('../config/database');

const Project = db.define('project', {
    project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
});

module.exports = Project;