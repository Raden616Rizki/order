const { Books } = require('../models');
const debug = require('debug')('app:book.controller');

const createBook = async (req, res) => {
    const { title, author, price, quantity_available } = req.body;

    try {
        await Books.create({ title, author, price, quantity_available });
        res.sendStatus(200);
    } catch (e) {
        debug(e);
        res.status(500).send('Error creating book');
    }
}

const updateBook = async (req, res) => {
    const { title, author, price, quantity_available } = req.body;
    const { id } = req.params;

    try {
        await Books.update( id, { title, author, price, quantity_available });
        res.sendStatus(200);
    } catch (e) {
        debug(e);
        res.status(500).send(e.message || 'Error updating book');
    }
}

const readBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.read(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error fetching book by ID');
    }
};


const getAllBooksFiltered = async (req, res) => {
    const { title, author, minPrice, maxPrice, page, limit } = req.query;
    const filters = {};

    if (title) {
        filters.title = { like: title };
    }

    if (author) {
        filters.author = { like: author };
    }

    if (minPrice) {
        filters.price = { min: minPrice };
    }

    if (maxPrice) {
        filters.price = { ...filters.price, max: maxPrice };
    }

    try {
        const books = await Books.getAllBooksFiltered(filters, page, limit);
        res.json(books);
    } catch (e) {
        debug(e);
        res.status(500).send('Error fetching books');
    }
}

module.exports = { createBook, updateBook, readBook, getAllBooksFiltered };