const { asyncPool } = require("../config/queries.js");

const addUser = async (data) => {
	const { name, email, number, userId, chatId } = data;

	const [user] = await asyncPool(`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`);
	if(user) throw new Error('Ви вже зареєстровані');
	
	return asyncPool('INSERT INTO users (name, email, number, user_id, chat_id) VALUES ($1, $2, $3, $4, $5)', [name, email, number, userId, chatId]);
};

const authorizeUser = async (userId) => {
	const [user] = await asyncPool(`SELECT * FROM users WHERE user_id = ${userId} LIMIT 1`);

	if(!user) throw new Error('Для виконання цієї дії ви повинні спочатку зареєструватися');
	if(user.authorized) throw new Error('Ви вже авторизовані');

	try {
		await asyncPool('UPDATE users SET authorized = true WHERE user_id = $1', [userId]);
	} catch (error) {
		throw new Error('Помилка авторизації');
	}
}

const getSubcribedUsers = () => {
	return asyncPool('SELECT * FROM users WHERE user_id IS NOT NULL AND subscribed = true ORDER BY id ASC');
};

const isAuthorized = (user_id) => {
	const [user] = asyncPool(`SELECT * FROM users WHERE user_id = ${user_id} AND authorized = true LIMIT 1`);
	return user.authorized;
}

const getAllOrders = async (user_id) => {
	const [user] = await asyncPool(`SELECT * FROM users WHERE user_id = ${user_id} LIMIT 1`);

	if(!user) throw new Error('Для виконання цієї дії ви повинні спочатку зареєструватися');
	if(!user.authorized) throw new Error('Ви не маєте права виконувати цю дію. Ви повинні спочатку авторизуватися');
	
	return asyncPool('SELECT * FROM orders ORDER BY id ASC');
};

const subscribeUser = async (user_id) => {
	const [user] = await asyncPool(`SELECT * FROM users WHERE user_id = ${user_id} LIMIT 1`);

	if(!user) throw new Error('Для виконання цієї дії ви повинні спочатку зареєструватися');
	if(!user.authorized) throw new Error('Ви не маєте права виконувати цю дію. Ви повинні спочатку авторизуватися');

	try {
		await asyncPool('UPDATE users SET subscribed = true WHERE user_id = $1', [user_id]);
	} catch (error) {
		throw new Error('Помилка підписки');
	}
}

const unsubscribeUser = async (user_id) => {
	const [user] = await asyncPool(`SELECT * FROM users WHERE user_id = ${user_id} LIMIT 1`);

	if(!user) throw new Error('Для виконання цієї дії ви повинні спочатку зареєструватися');
	if(!user.subscribed) throw new Error('Ви не пiдписані');

	try {
		await asyncPool('UPDATE users SET subscribed = false WHERE user_id = $1', [user_id]);
	} catch (error) {
		throw new Error('Помилка відписки');
	}
}

const deleteUser = (user_id) => {
  return asyncPool('DELETE FROM users WHERE user_id = $1', [user_id])
};

module.exports = {
  addUser,
  authorizeUser,
  getSubcribedUsers,
  isAuthorized,
  getAllOrders,
  subscribeUser,
  unsubscribeUser,
  deleteUser
};