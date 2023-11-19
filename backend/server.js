import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { errorHandler } from './middleware/error.js';

import { orderRoutes } from './routes/orderRoutes.js';
import { userRoutes } from './routes/userRoures.js';

import './telegram/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});