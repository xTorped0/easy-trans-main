const express = require('express');
const { getOrders, postOrder, deleteOrder } = require('../controllers/order.js');

const router = express.Router();

// POST new customer
router.post('/', postOrder);

// GET all customers
router.get('/', getOrders);

// DELETE customer
router.delete('/:id', deleteOrder);

module.exports = router;