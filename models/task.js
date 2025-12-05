const {Model, DataTypes} = require('sequelize');
const connection = require('./connection');

class Task extends Model {}

Task.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        sequelize: connection,
    }
);


module.exports = Task;