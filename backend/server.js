const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const errorHandler = require('./middleware/error.js');

const orderRoutes = require('./routes/orderRoutes.js');
const userRoutes = require('./routes/userRoures.js');

const { token, bot } = require('./telegram/index.js');

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

// Endpoint for handling updates from Telegram
app.post(`/api/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

