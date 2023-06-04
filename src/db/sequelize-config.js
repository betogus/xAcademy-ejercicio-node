const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const dbInstance = new Sequelize({
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT, 
    dialect: "mysql" 
})

module.exports = { dbInstance }
