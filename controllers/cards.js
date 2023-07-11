const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      console.log('создался кард');
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
