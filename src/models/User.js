const { Model, DataTypes } = require('sequelize')
const { dbInstance } = require('../db/sequelize-config')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbInstance,
    modelName: 'User',
    createdAt: false, 
    updatedAt: false
})



module.exports = {User}
