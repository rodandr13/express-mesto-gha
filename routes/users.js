const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { getUserValidation, updateProfileValidation, updateAvatarValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get(
  '/:id',
  getUserValidation,
  getUser,
);
router.patch(
  '/me',
  updateProfileValidation,
  updateUser,
);
router.patch(
  '/me/avatar',
  updateAvatarValidation,
  updateAvatar,
);

module.exports = router;
