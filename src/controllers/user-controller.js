const UserService = require('../services/user-service')


async function login(req, res, next) {
    const {name, password} = req.body
    try {
        const result = await UserService.login(name, password)
        res.status(200).send(result)
    } catch(error) {
        next(error)
    }
   
}

module.exports = { login }
