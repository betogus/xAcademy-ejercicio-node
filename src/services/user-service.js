const { NotAuthorized } = require("../exceptions/user-exceptions")
const { User } = require("../models/User")
const jwt = require('jsonwebtoken')


async function login(name, password) {
    const user = await User.findOne({
        where: {
            name: name,
            password: password
        }
    })
    if (!user) {
        throw new NotAuthorized('Nombre y/o contraseña incorrectos')
    }
    const token = jwt.sign({
        id: user.id,
        name: user.name
    }, 'ClaveUltraSecreta')
    return token
}

module.exports = { login }