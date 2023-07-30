const VALID_URL_EXPRESSION = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;

const allowedCors = [
  'https://theory-web.nomoredomains.sbs',
  'http://api.theory-web.nomoreparties.co',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  VALID_URL_EXPRESSION,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
