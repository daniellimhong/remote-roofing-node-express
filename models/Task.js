const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');
const Project = require('./Project');

const Task = db.define('task', {
    task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    task_name: {
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
            key: 'user_id'
        }
    },
    project_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Project,
            key: 'project_id'
        }
    }
});

module.exports = Task;