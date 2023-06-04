const {
    NotFound
} = require('../exceptions/user-exceptions')
const {
    Book
} = require('../models/Book')
const {
    Library
} = require('../models/Library')

async function getAll() {
    const libraries = await Library.findAll()

    const librariesNotErased = libraries.filter(library => library.erase === false)
    const librariesToShow = librariesNotErased.map(library => {
        return {
            id: library.id,
            name: library.name,
            location: library.location,
            phone: library.phone,
            erase: library.erase
        }

    })
    if (librariesToShow.length === 0) {
        throw new NotFound('No hay librerías')
    }
    for (let library of librariesToShow) {
        let books = await Book.findAll({
            where: {
                LibraryId: library.id,
                erase: false
            }
        })
        library.books = books.map(book => {
            return {
                id: book.id,
                isbn: book.isbn,
                title: book.title,
                author: book.author,
                year: book.year
            };
        });

    }
    return librariesToShow
}

async function getById(id) {
    const libraries = await getAll()
    const library = libraries.find(lib => lib.id === parseInt(id))
    return library
}

async function create(name, location, phone) {
    try {
        const library = new Library()
        library.name = name
        library.location = location
        library.phone = phone
        library.erase = false
        const libraryCreated = await library.save()
        return libraryCreated

    } catch (err) {
        throw new Error('Error al crear la librería');
    }
}

async function edit(name, location, phone, id) {
    const library = await Library.findOne({
        where: {
            id: id,
            erase: false
        }
    })
    if (library) {
        try {
            library.name = name
            library.location = location
            library.phone = phone
            const libraryEdited = await library.save()
            return libraryEdited
        } catch (err) {
            throw new Error(err)
        }

    } else {
        throw new Error('No hay coincidencias')
    }

}
async function deleteLibrary(id) {
    const library = await Library.findOne({
        where: {
            id: id,
            erase: false
        }
    })
    if (library) {
        library.erase = true
        const booksFromLibrary = await Book.findAll({
            where: {
                LibraryId: id,
                erase: false
            }
        })
        booksFromLibrary.map(async book => {
            book.erase = true
            await book.save()
        })
        await library.save()
    } else {
        throw new NotFound('Librería no encontrada')
    }
}

async function addBook(title, isbn, author, year, id) {
    try {
        const book = new Book();
        book.isbn = isbn;
        book.title = title;
        book.author = author;
        book.year = year;
        book.LibraryId = id;
        book.erase = false;
        await book.save();
        const library = await getById(id)
        return library
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    edit,
    deleteLibrary,
    addBook
}