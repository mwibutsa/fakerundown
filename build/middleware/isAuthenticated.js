"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonResponse = _interopRequireDefault(require("../utils/jsonResponse"));
var _jwt = require("../utils/jwt");
var _statusCodes = _interopRequireDefault(require("../constants/statusCodes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void} -
 */
const isAuthenticated = (req, res, next) => {
  let token = req.headers['x-auth-token'];
  if (token) {
    token = String(token).replace('Bearer ', '');
    const decodedToken = (0, _jwt.verifyToken)(token);
    if (decodedToken.id) {
      req.currentUserId = decodedToken.id;
      return next();
    }
  }
  return (0, _jsonResponse.default)({
    status: _statusCodes.default.HTTP_UNAUTHORIZED,
    message: 'Please login first',
    res
  });
};
var _default = isAuthenticated;
exports.default = _default;