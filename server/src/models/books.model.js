const createModelHelper = require('../helpers/model.helper')

const name = 'Books';
const tableName = 'books';

const selectableProps = [
    'id',
    'title',
    'author',
    'price',
    'quantity_available',
]

module.exports = (knex) => {
    const bookHelper = createModelHelper({
        knex,
        name,
        tableName,
        selectableProps
    });

    const create = (book) => bookHelper.create(book);
    const update = (id, book) => bookHelper.update(id, book);
    const read = (id) => bookHelper.read(id);
    const getAllBooksFiltered = (filters, page, limit) => bookHelper.getAllItemsFiltered(filters, page, limit);

    return {
        name,
        ...bookHelper,
        create,
        update,
        read,
        getAllBooksFiltered,
    }
}