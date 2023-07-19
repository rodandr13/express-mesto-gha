const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {login, createUser} = require('./controllers/users');

const app = express();
const { PORT = 3000, MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URI);

app.use((req, res, next) => {
  req.user = {
    _id: '64abfec839cd8b0c0981bc2a',
  };
  next();
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/signin', login);
app.use('/signup', createUser);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не нейдена.' });
});
app.listen(PORT);
