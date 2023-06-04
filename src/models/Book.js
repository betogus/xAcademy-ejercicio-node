const { Model, DataTypes } = require('sequelize')
const { dbInstance } = require('../db/sequelize-config')

class Book extends Model {}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isbn: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    erase: {
        type: DataTypes.BOOLEAN,
    },
    LibraryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Libraries',
            key: 'id'
        },
    }
}, {
    sequelize: dbInstance,
    modelName: 'Book',
    createdAt: false, //que no me agregue un campo de fecha de creacion
    updatedAt: false
})


module.exports = {Book}
