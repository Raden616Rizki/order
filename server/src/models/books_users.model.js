const createModelHelper = require('../helpers/model.helper')

const name = 'BooksUsers';
const tableName = 'books_users';

const selectableProps = [
    'id',
    'book_id',
    'user_id',
    'quantity',
    'created_at',
]

module.exports = (knex) => {
    const bookUserHelper = createModelHelper({
        knex,
        name,
        tableName,
        selectableProps
    });

    const create = (book) => bookUserHelper.create(book);
    const read = (id) => bookUserHelper.read(id);
    const getAllOrderFiltered = (filters, page, limit) => bookUserHelper.getAllItemsFiltered(filters, page, limit);

    return {
        name,
        ...bookUserHelper,
        create,
        read,
        getAllOrderFiltered,
    }
}