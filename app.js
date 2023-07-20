const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const {login, createUser} = require('./controllers/users');

const app = express();
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URI);

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('/signin', login);
app.use('/signup', createUser);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});
app.use((err, req, res, next) => {
  console.log('попал в ошибку мидлваре');
  res.status(500).send({ message: err.message });
  next();
});
app.listen(PORT);
