const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation, cardIdValidation,
} = require('../middlewares/validation');

router.post(
  '/',
  createCardValidation,
  createCard,
);
router.get('/', getCards);
router.delete(
  '/:cardId',
  cardIdValidation,
  deleteCard,
);
router.put(
  '/:cardId/likes',
  cardIdValidation,
  likeCard,
);
router.delete(
  '/:cardId/likes',
  cardIdValidation,
  dislikeCard,
);

module.exports = router;
