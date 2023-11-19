import TelegramBot from 'node-telegram-bot-api';
import { deleteUser, getSubcribedUsers, addUser, unsubscribeUser, authorizeUser, getAllOrders, subscribeUser } from './user.js';

import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true, interval: 1000, onlyFirstMatch: true });

let inProcess = {};

bot.onText(/\/instruction/, (msg, match) => {
	const chatId = msg.chat.id;

	const text = `Для того, щоб використовувати бота потрібно зареєструвати нового користувача, використовуючи команду /register після цього користувача потрібно авторизувати командою /authorize, після чого можна підписатися на повідомлення про нові замовлення /subscribe і отримати перелік всіх замовлень /orders`;

	bot.sendMessage(chatId, text);
});
	
bot.onText(/\/register/, (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	if(inProcess[userId]) return;
	inProcess[userId] = true;

	bot.sendMessage(chatId, 'Введiть ваше iм\'я');

	bot.once('text', (msg) => {
		const name = msg.text;

		bot.sendMessage(chatId, `Дякую, ${name}. Тепер введiть вашу пошту (email)`);

		bot.once('text', (msg) => {
			const email = msg.text;

			bot.sendMessage(chatId, `Ваше iм'я: ${name}.\nВаша пошта: ${email}.\nВсе вiрно? Так/Нi`);

			bot.once('text', async (msg) => {
				if(msg.text.toLowerCase() !== 'так') {
					bot.sendMessage(chatId, 'Вiдмiна реєстрацiї.\nСкористайтесь командою /register, щоб зареєструватися заново');
					delete inProcess[userId];
					return;
				}

				try {
					await addUser({ name, email, userId, chatId });
					bot.sendMessage(chatId, 'Ви успiшно зареєструвалися.\nДля авторизацiї скористайтесь командою /authorize');
				} catch	(error) {
					console.log(error);
					bot.sendMessage(chatId, error.text || error.message || error);
				}

				delete inProcess[userId];
			});
		});
	});
});

bot.onText(/\/authorize/, async (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	if(inProcess[userId]) return;
	inProcess[userId] = true;

	bot.sendMessage(chatId, 'Введiть пароль для авторизацiї');

	bot.once('text', async (msg) => {
		const password = msg.text;
		const pass = process.env.TG_PASSWORD;

		if(password !== pass) {
			bot.sendMessage(chatId, 'Невірний пароль');
			delete inProcess[userId];
			return;
		}

		try {
			await authorizeUser(userId, password);

			bot.sendMessage(chatId, 'Ви успішно авторизувалися');
		} catch(error) {
			bot.sendMessage(chatId, error.text || error.message || error);
		}

		delete inProcess[userId];
	});
});

bot.onText(/\/subscribe/, async (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	try {
		await subscribeUser(userId);

		bot.sendMessage(chatId, 'Ви успішно підписалися на повідомлення про нові замовлення');
	} catch(error) {
		bot.sendMessage(chatId, error.text || error.message || error);
	}
});

bot.onText(/\/orders/, async (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	try {
		const orders = await getAllOrders(userId);

		if(orders.length === 0) {
			bot.sendMessage(chatId, 'Замовлень немає');
			return;
		}
		const message = orders.map(order => {
			const { name, number, created_at } = order;
			const formattedTime = new Date(created_at).toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });

			return `Iм'я: ${name}\nНомер: ${number}\nЧас замовлення: ${formattedTime}\n=====\n`;
		}).join('\n');

		bot.sendMessage(chatId, message);
	} catch(error) {
		bot.sendMessage(chatId, error.text || error.message || error);
	}
});

bot.onText(/\/unsubscribe/, async (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	try {
		await unsubscribeUser(userId);

		bot.sendMessage(chatId, 'Ви були відписані від повідомлень про нові замовлення');
	} catch(error) {
		bot.sendMessage(chatId, error.text || error.message || error);
	}
});

bot.onText(/\/delete_user/, async (msg, match) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	try {
		await deleteUser(userId);

		bot.sendMessage(chatId, 'Ви успiшно видалили свiй аккаунт');
	} catch(error) {
		bot.sendMessage(chatId, error.text || error.message || error);
	}
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Скористайтеся командою /instruction, щоб отримати інструкцію по використанню бота`);
});


export async function onOrderCreated(order = {}) {
	try {
		const users = await getSubcribedUsers();

		const { name, number, created_at } = order;
		const formattedTime = new Date(created_at).toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });
		
		users?.forEach(user => {
			bot.sendMessage(
				user.chat_id, 
				`Iм'я: ${name}\nНомер: ${number}\nЧас замовлення: ${formattedTime}`);
		});
	} catch(error) {
		console.log(error);
	}
};