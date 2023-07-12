const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(500).send({ message: error.message });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send(card);
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

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send(card);
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

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      res.send(card);
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
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
