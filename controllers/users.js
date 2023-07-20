const User = require('../models/user');
const {NotFoundError} = require('../errors/NotFoundError');
const {handleErrors} = require('../utils/utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleErrors(res, error);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      handleErrors(res, error);
    });
};

const login = (req, res) => {
  const {email, password} = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {_id: user._id},
        'super-strong-secret',
        {expiresIn: '7d'},
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({token});
    })
    .catch((error) => {
      console.log(error.message);
      res.send({message: 'errorrrrrrrrrrrrr'});
    });
};

const getUser = (req, res) => {
  const {id} = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((error) => {
      handleErrors(res, error);
    });
};

const updateUser = (req, res) => {
  const {name, about} = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {name, about}, {new: true, runValidators: true})
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleErrors(res, error);
    });
};

const updateAvatar = (req, res) => {
  const {avatar} = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {avatar}, {new: true, runValidators: true})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((error) => {
      handleErrors(res, error);
    });
};

const getCurrentUser = ((req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
};
