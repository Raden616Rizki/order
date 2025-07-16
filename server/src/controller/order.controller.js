const { BooksUsers } = require('../models');
const debug = require('debug')('app:order.controller');

const createOrder = async (req, res) => {
    const { book_id, user_id, quantity } = req.body;

    try {
        await BooksUsers.create({ book_id, user_id, quantity });
        res.sendStatus(200);
    } catch (e) {
        debug(e);
        res.status(500).send('Error creating order');
    }
}

const readOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await BooksUsers.read(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error fetching order by ID');
    }
};


const getAllOrdersFiltered = async (req, res) => {
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
        const books = await BooksUsers.getAllOrderFiltered(filters, page, limit);
        res.json(books);
    } catch (e) {
        debug(e);
        res.status(500).send('Error fetching books');
    }
}

module.exports = { createOrder, readOrder, getAllOrdersFiltered };