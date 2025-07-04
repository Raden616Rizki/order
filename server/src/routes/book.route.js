const router = require('express').Router();
const { createBook, getAllBooksFiltered, updateBook } = require('../controller/book.controller');
const { authenticateJwt, authorizeRole } = require('../middleware/auth.middleware');

router.post('/', authenticateJwt, authorizeRole('ADMIN'), createBook);
router.get('/', authenticateJwt, getAllBooksFiltered);
router.put('/:id', authenticateJwt, authorizeRole('ADMIN'), updateBook);

module.exports = router;