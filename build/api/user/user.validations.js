"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSignUp = exports.validateLogin = void 0;
var _celebrate = require("celebrate");
const validateSignUp = (0, _celebrate.celebrate)({
  body: _celebrate.Joi.object().keys({
    firstName: _celebrate.Joi.string().required(),
    lastName: _celebrate.Joi.string().required(),
    middleName: _celebrate.Joi.string().allow(null, ''),
    email: _celebrate.Joi.string().email(),
    username: _celebrate.Joi.string().allow(null, ''),
    phoneNumber: _celebrate.Joi.string().allow(null, ''),
    password: _celebrate.Joi.string().required().min(8)
  })
});
exports.validateSignUp = validateSignUp;
const validateLogin = (0, _celebrate.celebrate)({
  body: _celebrate.Joi.object().keys({
    accountIdentifier: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required()
  })
});
exports.validateLogin = validateLogin;