const LibraryService = require('../services/library-service')

async function getAll (req, res, next) {
    try {
        const libraries = await LibraryService.getAll()
        res.status(200).send(libraries)
    } catch (err) {
        next(err)
    }
}

async function getById (req, res, next) {
    let {id} = req.params
    try {
        const library = await LibraryService.getById(id)
        res.status(200).send(library)
    } catch (error) {
        next(error)
    }
}

async function create (req, res) {
    const {name, location, phone} = req.body
    try {
        const newLibrary = await LibraryService.create(name, location, phone)
        res.status(201).send(newLibrary)
    } catch (err) {
        next(err)
    }
}

async function edit (req, res, next) {
    let {id} = req.params
    const {name, location, phone} = req.body
    try {
        const libraryEdited = await LibraryService.edit(name, location, phone, id)
        res.status(201).send(libraryEdited)
    } catch (err) { 
        next(err)
    }
}

async function deleteLibrary (req, res, next) {
    let {id} = req.params
    try {
        await LibraryService.deleteLibrary(id)
        res.status(201).send("Library " + id + " deleted")
    } catch (err) {
        next(err)
    }
}

async function addBook (req, res, next) {
    let { id } = req.params
    let { title, isbn, author, year } = req.body
    try {
        const bookToAdd = await LibraryService.addBook(title, isbn, author, year, id)
        res.status(201).send(bookToAdd)
    } catch (err) {
        next(err)
    }
    
}

module.exports = { getAll, getById, create, edit, deleteLibrary, addBook }
