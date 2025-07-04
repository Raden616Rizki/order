const router = require('express').Router();
const { createBook } = require('../controller/book.controller');

router.post('/', createBook);

module.exports = router;