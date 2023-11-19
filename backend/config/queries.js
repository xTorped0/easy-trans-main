import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'root',
  port: 5432,
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