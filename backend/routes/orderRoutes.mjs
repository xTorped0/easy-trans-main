import express from 'express';
import { getOrders, postOrder, deleteOrder } from '../controllers/order.mjs';

const router = express.Router();

// POST new customer
router.post('/', postOrder);

// GET all customers
router.get('/', getOrders);

// DELETE customer
router.delete('/:id', deleteOrder);

export const orderRoutes = router;
