const { Model, DataTypes } = require('sequelize')
const { dbInstance } = require('../db/sequelize-config')
const { Book } = require('./Book')

class Library extends Model {}

Library.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    erase: {
        type: DataTypes.BOOLEAN,
    }

}, {
    sequelize: dbInstance,
    modelName: 'Library',
    createdAt: false, 
    updatedAt: false
})

Library.hasMany(Book)
Book.belongsTo(Library);

module.exports = {Library}
