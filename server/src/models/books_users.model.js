const createModelHelper = require('../helpers/model.helper')

const name = 'BooksUsers';
const tableName = 'books_users';

const selectableProps = [
  'books_users.id',
  'books_users.book_id',
  'books_users.user_id',
  'books_users.quantity',
  'books_users.created_at',
]

module.exports = (knex) => {
  const bookUserHelper = createModelHelper({
    knex,
    name,
    tableName,
    selectableProps
  });

  const create = (book) => bookUserHelper.create(book);
  const read = (id) => getOrderById(id);
  const getAllOrderFiltered = (filters, page, limit) => bookUserHelper.getAllItemsFiltered(filters, page, limit);

  /**
   * Custom function: get order by id with joined user and book
   */
  const getOrderById = (id) => {
    return knex('books_users')
      .select(
        'books_users.id as order_id',
        'books_users.quantity',
        'books_users.created_at',
        'books.id as book_id',
        'books.title as book_title',
        'books.author as book_author',
        'books.price as book_price',
        'books.quantity_available as book_quantity_available',
        'users.id as user_id',
        'users.email as user_email',
        'users.first_name as user_first_name',
        'users.last_name as user_last_name',
        'users.role as user_role',
        'users.created_at as user_created_at'
      )
      .innerJoin('books', 'books_users.book_id', 'books.id')
      .innerJoin('users', 'books_users.user_id', 'users.id')
      .where('books_users.id', id)
      .first();
  }

  return {
    name,
    ...bookUserHelper,
    create,
    read,
    getAllOrderFiltered,
    getOrderById,
  }
}
