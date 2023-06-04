const BookService = require('../services/book-service')

async function getAll (req, res, next) {
    try {
        const books = await BookService.getAll()
        res.status(200).send(books)
    } catch (err) {
        next(err)
    }
}

async function getById (req, res, next) {
    let {id} = req.params
    try {
        const book = await BookService.getById(id)
        res.status(200).send(book)
    } catch (error) {
        next(error)
    }
}

async function create (req, res, next) {
    const {isbn, title, author, year, LibraryId} = req.body
    try {
        const newBook = await BookService.create(isbn, title, author, year, LibraryId)
         res.status(201).send(newBook)
    } catch (err){
        next(err)
    }
     
}

async function edit (req, res, next) {
    let {id} = req.params
    const {name, isbn, title, author, year, LibraryId} = req.body
    try {
        const bookEdited = await BookService.edit(name, isbn, title, author, year, LibraryId, id)
        res.status(201).send(bookEdited)
    } catch(err) {
        next(err)
    }
    
}

async function deleteBook (req, res, next) {
    let {id} = req.params
    try {
        await BookService.deleteBook(id)
        res.status(201).send("Book " + id + " deleted")    
    } catch(err) {
        next(err)
    }
}

module.exports = { getAll, getById, create, edit, deleteBook }
