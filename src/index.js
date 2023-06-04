const express = require('express')
const app = express()
const port = 5000
const userRoutes = require('./routes/user-routes')
const libraryRoutes = require('./routes/library-routes')
const bookRoutes = require('./routes/book-routes')
const { errorHandlerMiddleware } = require('./middlewares/error-handler')
const { User } = require('./models/User')
const { initializeAuthentication } = require('./auth/auth')
const { dbInstance } = require('./db/sequelize-config')

initializeAuthentication()
app.use(express.json()) 

/* CREACION DE LAS TABLAS */

dbInstance.sync({force: false}) 
.then(() => {
    console.log('Tablas creadas correctamente');
    
    /* CREACION DE UN USUARIO */
    async function crearUsuario() {
        let user = await User.findOne({
            where: {
                name: "admin"
            }
        })

        if (!user) {
            let newUser = new User()
            newUser.name = "admin"
            newUser.password = "admin"
            await newUser.save()
        }
    }
    crearUsuario()
    

})
.catch((error) => {
    console.error('Error al crear las tablas:', error);
}); 


/* RUTAS */
app.use('/user', userRoutes)
app.use('/library', libraryRoutes)
app.use('/book', bookRoutes)
app.use(errorHandlerMiddleware)
app.listen(port, () => console.log('Server Up at port '+ port))

