"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("./user.definition"));
var _error = _interopRequireDefault(require("./error.definition"));
var _pagination = _interopRequireDefault(require("./pagination.definition"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  ..._user.default,
  ..._error.default,
  ..._pagination.default
};
exports.default = _default;