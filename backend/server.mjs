import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import { errorHandler } from './middleware/error.mjs';

import { orderRoutes } from './routes/orderRoutes.mjs';
import { userRoutes } from './routes/userRoures.mjs';

import './telegram/index.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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