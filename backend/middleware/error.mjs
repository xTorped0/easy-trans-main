import { contants } from '../constants.mjs';

export const errorHandler = (err, req, res, next) => {
	const statusCode = res.code ? res.statusCode : 500;

	switch (statusCode) {
		case contants.VALIDATION_ERROR:
			res.json({ title: 'Validation Failed', message: err.message, stackTrace: err.stack });
			break;
		case contants.UNAUTHRIZED:
			res.json({ title: 'Unauthorized', message: err.message, stackTrace: err.stack });
			break;
		case contants.FORBIDDEN:
			res.json({ title: 'Forbidden', message: err.message, stackTrace: err.stack });
			break;
		case contants.NOT_FOUND:
			res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack });
			break;
		case contants.SERVER_ERROR:
			res.json({ title: 'Server Error', message: err.message, stackTrace: err.stack });
			break;
		default:
			//
			break;
	}
};
