const createModelHelper = require("../helpers/model.helper");

const name = "BooksUsers";
const tableName = "books_users";

const selectableProps = [
  "books_users.id",
  "books_users.book_id",
  "books_users.user_id",
  "books_users.quantity",
  "books_users.created_at",
];

module.exports = (knex) => {
  const bookUserHelper = createModelHelper({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const create = (book) => bookUserHelper.create(book);
  const read = (id) => getOrderById(id);
  const getAllOrderFiltered = (filters, page, limit) =>
    getAllItemsFiltered(filters, page, limit);

  /**
   * Custom function: get order by id with joined user and book
   */
  const getOrderById = (id) => {
    return knex("books_users")
      .select(
        "books_users.id as order_id",
        "books_users.quantity",
        "books_users.created_at",
        "books.id as book_id",
        "books.title as book_title",
        "books.author as book_author",
        "books.price as book_price",
        "books.quantity_available as book_quantity_available",
        "users.id as user_id",
        "users.email as user_email",
        "users.first_name as user_first_name",
        "users.last_name as user_last_name",
        "users.role as user_role",
        "users.created_at as user_created_at",
        knex.raw("(books.price * books_users.quantity) as total_price")
      )
      .innerJoin("books", "books_users.book_id", "books.id")
      .innerJoin("users", "books_users.user_id", "users.id")
      .where("books_users.id", id)
      .first();
  };

  /**
   * Get all orders filtered by user and book fields
   */
  const getAllItemsFiltered = async (filters = {}, page = 1, limit = 10) => {
    try {
      const query = knex("books_users")
        .select(
          "books_users.id as order_id",
          "books_users.quantity",
          "books_users.created_at",
          "books.id as book_id",
          "books.title as book_title",
          "books.author as book_author",
          "books.price as book_price",
          "books.quantity_available as book_quantity_available",
          "users.id as user_id",
          "users.email as user_email",
          "users.first_name as user_first_name",
          "users.last_name as user_last_name",
          "users.role as user_role",
          "users.created_at as user_created_at",
          knex.raw("(books.price * books_users.quantity) as total_price")
        )
        .innerJoin("books", "books_users.book_id", "books.id")
        .innerJoin("users", "books_users.user_id", "users.id");

      // Apply filter for fullname (first_name + ' ' + last_name)
      if (filters.fullname) {
        query.whereRaw(
          "LOWER(CONCAT(users.first_name, ' ', users.last_name)) LIKE ?",
          [`%${filters.fullname.toLowerCase()}%`]
        );
      }

      // Apply filters for book fields
      if (filters.title) {
        query.where("books.title", "like", `%${filters.title}%`);
      }
      if (filters.author) {
        query.where("books.author", "like", `%${filters.author}%`);
      }

      // Apply filters for total price (price * quantity)
      if (filters.minPrice) {
        query.whereRaw("(books.price * books_users.quantity) >= ?", [
          filters.minPrice,
        ]);
      }
      if (filters.maxPrice) {
        query.whereRaw("(books.price * books_users.quantity) <= ?", [
          filters.maxPrice,
        ]);
      }

      // Count total items with the same filters
      const totalCountQuery = knex("books_users")
        .count("* as total")
        .innerJoin("books", "books_users.book_id", "books.id")
        .innerJoin("users", "books_users.user_id", "users.id");

      // Re-apply same filters for count query
      if (filters.first_name) {
        totalCountQuery.where(
          "users.first_name",
          "like",
          `%${filters.first_name}%`
        );
      }
      if (filters.last_name) {
        totalCountQuery.where(
          "users.last_name",
          "like",
          `%${filters.last_name}%`
        );
      }
      if (filters.title) {
        totalCountQuery.where("books.title", "like", `%${filters.title}%`);
      }
      if (filters.author) {
        totalCountQuery.where("books.author", "like", `%${filters.author}%`);
      }
      if (filters.minPrice) {
        totalCountQuery.whereRaw("(books.price * books_users.quantity) >= ?", [
          filters.minPrice,
        ]);
      }
      if (filters.maxPrice) {
        totalCountQuery.whereRaw("(books.price * books_users.quantity) <= ?", [
          filters.maxPrice,
        ]);
      }

      const [{ total }] = await totalCountQuery;

      // Pagination
      query.offset((page - 1) * limit).limit(limit);

      // Execute the query
      const items = await query;

      return {
        total,
        items,
      };
    } catch (e) {
      console.error("Error in getAllOrderFiltered:", e);
      throw new Error(`Error fetching the orders: ${e.message}`);
    }
  };

  return {
    name,
    ...bookUserHelper,
    create,
    read,
    getAllOrderFiltered,
    getOrderById,
    getAllItemsFiltered,
  };
};
