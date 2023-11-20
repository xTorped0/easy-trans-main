import mongoose from 'mongoose';

export const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.CONNECTION_STRING);
		console.log('DataBase connected: ', connect.connection.host, connect.connection.name);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
