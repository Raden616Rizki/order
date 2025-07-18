const { BooksUsers } = require("../models");
const debug = require("debug")("app:order.controller");

const createOrder = async (req, res) => {
  const { book_id, user_id, quantity } = req.body;

  try {
    await BooksUsers.create({ book_id, user_id, quantity });
    res.sendStatus(200);
  } catch (e) {
    debug(e);
    res.status(500).send("Error creating order");
  }
};

const readOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await BooksUsers.read(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching order by ID");
  }
};

const getAllOrdersFiltered = async (req, res) => {
  const {
    title,
    author,
    fullname,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;
  const filters = {};

  // Filters untuk books
  if (title) {
    filters.title = title;
  }
  if (author) {
    filters.author = author;
  }

  // Filters untuk users
  if (fullname) {
    filters.fullname = fullname;
  }


  // Filters untuk total price
  if (minPrice) {
    filters.minPrice = parseFloat(minPrice);
  }
  if (maxPrice) {
    filters.maxPrice = parseFloat(maxPrice);
  }

  try {
    const orders = await BooksUsers.getAllOrderFiltered(
      filters,
      parseInt(page),
      parseInt(limit)
    );
    res.json({
      ok: true,
      data: orders.items,
      total: orders.total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (e) {
    console.error("Error fetching orders:", e);
    res.status(500).json({
      ok: false,
      message: "Error fetching orders",
      error: e.message,
    });
  }
};

module.exports = { createOrder, readOrder, getAllOrdersFiltered };
