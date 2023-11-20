const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const errorHandler = require('./middleware/error.js');

const orderRoutes = require('./routes/orderRoutes.js');
const userRoutes = require('./routes/userRoures.js');

require('./telegram/index.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.get('/api', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});