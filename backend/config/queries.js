import pg from 'pg';

const { Pool } = pg;

import * as dotenv from 'dotenv';

dotenv.config();

const USER = process.env.DB_USER || 'me';
const HOST = process.env.DB_HOST || 'localhost';
const DATABASE = process.env.DB_DATABASE || 'api';
const PASSWORD = process.env.DB_PASSWORD || 'root';
const PORT = process.env.DB_PORT || 5432;

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

export const asyncPool = (query, params = []) => {
  return new Promise((resolve, reject) => {
		pool.query(query, params, (error, results) => {
			if (error) reject(error);
			else resolve(results.rows);
		});
	});
}

export default pool;