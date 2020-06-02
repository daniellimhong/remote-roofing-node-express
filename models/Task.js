const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('task', {
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
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
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
            key: 'id'
        }
    },
    project_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Project,
            key: 'id'
        }
    }
});

module.exports = Task;