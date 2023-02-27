"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _statusCodes = _interopRequireDefault(require("../constants/statusCodes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const requestWrapper = callbackFunc => {
  return async (req, res, next) => {
    try {
      await callbackFunc(req, res, next);
    } catch (error) {
      if (_httpErrors.default.isHttpError(error)) {
        return next(error);
      }
      return next((0, _httpErrors.default)(_statusCodes.default.HTTP_SERVER_ERROR, error));
    }
  };
};
var _default = requestWrapper;
exports.default = _default;