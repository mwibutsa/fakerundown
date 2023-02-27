"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;
require("dotenv/config");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  JWT_SECRET_KEY
} = process.env;
const generateToken = (payload, options = {
  expiresIn: '30d'
}) => {
  return _jsonwebtoken.default.sign(payload, String(JWT_SECRET_KEY), options);
};
exports.generateToken = generateToken;
const verifyToken = token => {
  return _jsonwebtoken.default.verify(token, String(JWT_SECRET_KEY));
};
exports.verifyToken = verifyToken;