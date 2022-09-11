require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const auth = require('./middleware/authentication');
const leanerRouter = require('./routes/leaner');
const teacherRouter = require('./routes/teacher');
const helmet = require('helmet');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
app.use(express.json());
app.use(helmet());

const port = process.env.PORT || 5000;

app.use('/api/v1/leaner', leanerRouter);
app.use('/api/v1/teacher', auth, teacherRouter);

app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
