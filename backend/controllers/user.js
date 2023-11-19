// import asyncHandler from 'express-async-handler';

import pool from '../config/queries.js';

export const getUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if(error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

export const postUser = (request, response) => {
	const { name, email, chatId, number } = request.body;

	if(!name || !email) {
		response.status(400);
		throw new Error('All fields are mandatory');
	}
	
	pool.query(
		'INSERT INTO users (name, email, number, chat_id) VALUES ($1, $2, $3, $4)',
		[name, email, number, chatId],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`User added with ID: ${results.insertId}`);
  	}
	);
};

export const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
			response.status(404);
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}