const express = require('express')
const BookController = require('../controllers/book-controller')
const { isAuthenticated } = require('../middlewares/authentication')
const router = express.Router()

router.get('/getAll', BookController.getAll)
router.get('/getById/:id', BookController.getById)
router.post('/create', isAuthenticated, BookController.create)
router.put('/edit/:id', isAuthenticated, BookController.edit)
router.put('/delete/:id', isAuthenticated, BookController.deleteBook)

module.exports = router
