const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(500).send({ message: error.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'NotFoundError') {
        res.status(error.statusCode).send({ message: error.message });
        return;
      }
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(500).send({ message: error.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'NotFoundError') {
        res.status(error.statusCode).send({ message: error.message });
        return;
      }
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(500).send({ message: error.message });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
};
