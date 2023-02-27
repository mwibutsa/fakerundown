"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.comparePasswords = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author Mwibutsa Floribert
 * @param {string} password
 * @returns {Promise<string>} hashedPassword
 */
const hashPassword = async password => {
  const saltRounds = 10;
  const saltString = await _bcryptjs.default.genSalt(saltRounds);
  return _bcryptjs.default.hash(password, saltString);
};

/**
 * @author Mwibutsa Floribert
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} comparison result
 */
exports.hashPassword = hashPassword;
const comparePasswords = (plainPassword, hashedPassword) => {
  return _bcryptjs.default.compare(plainPassword, hashedPassword);
};
exports.comparePasswords = comparePasswords;