const express = require('express')
const LibraryController = require('../controllers/library-controller')
const { isAuthenticated } = require('../middlewares/authentication')
const router = express.Router()
router.get('/getAll', LibraryController.getAll)
router.get('/getById/:id', LibraryController.getById)
router.post('/create', isAuthenticated, LibraryController.create)
router.put('/edit/:id', isAuthenticated, LibraryController.edit)
router.put('/delete/:id', isAuthenticated, LibraryController.deleteLibrary)
router.put('/addBook/:id', isAuthenticated, LibraryController.addBook)

module.exports = router
