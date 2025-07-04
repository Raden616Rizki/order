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

module.exports = { createBook };