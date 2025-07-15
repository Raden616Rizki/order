const router = require('express').Router();
const { createOrder, readOrder, getAllOrdersFiltered } = require('../controller/order.controller');
const { authenticateJwt, authorizeRole } = require('../middleware/auth.middleware');

router.post('/', authenticateJwt, authorizeRole('ADMIN'), createOrder);
router.get('/', authenticateJwt, getAllOrdersFiltered);
router.get('/:id', authenticateJwt, readOrder);

module.exports = router;