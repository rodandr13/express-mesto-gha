const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();

const rateLimit = require('express-rate-limit');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const { login, createUser } = require('./controllers/users');
const { NotFoundError } = require('./errors/NotFoundError');
const { signupValidation, signinValidation } = require('./middlewares/validation');

const app = express();
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URI);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(
  '/signin',
  signinValidation,
  login,
);
app.use(
  '/signup',
  signupValidation,
  createUser,
);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
