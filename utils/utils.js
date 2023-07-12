const handleErrors = (res, error) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы некорректные данные при создании.' });
  }
  if (error.name === 'NotFoundError') {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res.status(500).send({ message: error.message });
};

module.exports = {
  handleErrors,
};
