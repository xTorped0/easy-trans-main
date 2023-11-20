import { query } from "express";
import pool from "../config/queries.mjs";
import { onOrderCreated } from "../telegram/index.mjs";

export const postOrder = (req, res) => {
	const { name, number } = req.body;

	if(!name || !number) {
		res.status(400);
		throw new Error('All fields are mandatory');
	}

	pool.query('INSERT INTO orders (name, number) VALUES ($1, $2) RETURNING *', [name, number], (error, results) => {
		if (error) {
			res.status(400);
			throw error;
		}

		try {
			onOrderCreated(results.rows[0]);
		} catch(error) {
			console.log(error);
		}
		res.status(201).send(`Order added with ID: ${results.rows[0].id}`);
	});

	// const orderAvailable = await Order.findOne({ name, number });

	// if(orderAvailable) {
	// 	const currentTime = new Date();

	// 	if(orderAvailable.createdAt.getTime() + 60000 > currentTime.getTime()) {
	// 		res.status(400);
	// 		throw new Error('Already ordered. Please try again after 1 minute');
	// 	}
	// }

	// const order = await Order.create({ name, number });

	// if(order) {
	// 	res.status(201).json(order);
	// } else {
	// 	res.status(400);
	// 	throw new Error('Order data is not valid');
	// }
};

export const getOrders = (req, res) => {
	pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
		if(error) {
			res.status(400);
			throw error;
		}
		const orders = results.rows;

		if(orders.length) {
			res.status(200).json(orders);
		} else {
			res.status(404);
			throw new Error('User data is not valid');
		}
	});
};

export const deleteOrder = (req, res) => {
	query('DELETE FROM orders WHERE id = $1', [req.params.id], (error, results) => {
		if (error) {
			res.status(404);
			throw error;
		}
		res.status(200).send(`Order deleted with ID: ${req.params.id}`);
	});
};
