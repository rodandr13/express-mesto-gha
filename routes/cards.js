const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation,
} = require('../middlewares/validation');

router.post(
  '/',
  createCardValidation,
  createCard,
);
router.get('/', getCards);
router.delete(
  '/:cardId',
  deleteCardValidation,
  deleteCard,
);
router.put(
  '/:cardId/likes',
  likeCardValidation,
  likeCard,
);
router.delete(
  '/:cardId/likes',
  dislikeCardValidation,
  dislikeCard,
);

module.exports = router;
