const { Book } = require('../models/Book')
const { Library } = require('../models/Library')

async function getAll() {
    try {
        const books = await Book.findAll()
        const booksNotErased = books.filter(book => book.erase === false)
        if (booksNotErased.length === 0) {
            throw new Error('No hay libros')
        }
        return booksNotErased
    } catch (err) {
        throw new Error(err)
    }
}

async function getById(id) {
    try {
        const book = await Book.findByPk(id)
        if (book === null || book.erase === true) {
            throw new Error('Libro no encontrado')
        }
        return book
    } catch (err) {
        throw new Error(err)
    }
   
}

async function create(isbn, title, author, year, LibraryId) {
    try {
        const library = await Library.findByPk(LibraryId)
        if (library && library.erase === false) {
            try {
                const book = new Book();
                book.isbn = isbn;
                book.title = title;
                book.author = author;
                book.year = year;
                book.LibraryId = LibraryId;
                book.erase = false;
                const bookCreated = await book.save();
                return bookCreated;
            } catch (err) {
                throw new Error('Error al crear el libro (LibraryId inexistente o isbn repetido)');
            }
        } else {
            throw new Error('Error al crear el libro (LibraryId inexistente)');
        }
    } catch (err) {
        throw new Error(err)
    } 
}

async function edit(name, isbn, title, author, year, LibraryId, id) {
    try {
        const book = await getById(id)
        if (book.erase === false) {
            book.name = name
            book.isbn = isbn
            book.title = title
            book.author = author
            book.year = year
            book.LibraryId = LibraryId
            const bookEdited = await book.save()
            return bookEdited
        } else {
            throw new Error('Error al editar el libro')
        }
    } catch (err) {
        throw new Error(err)
    }
    
}

async function deleteBook (id) {
    try {
        const book = await getById(id)
        if (book.erase === false) {
            book.erase = true
            await book.save()
        } else {
            throw new Error('Libro no encontrado')
        }
    } catch (err) {
        throw new Error(err)
    }
    
}


module.exports = { getAll, getById, create, edit, deleteBook }