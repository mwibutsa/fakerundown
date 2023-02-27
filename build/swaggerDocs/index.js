"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _definitions = _interopRequireDefault(require("./definitions"));
var _paths = _interopRequireDefault(require("./paths"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  DEV_ADMIN_EMAIL = 'info@ulli.com'
} = process.env;
var _default = {
  swagger: '2.0',
  info: {
    description: 'Ulli',
    version: '1.0.0',
    title: 'Ulli',
    termsOfService: '',
    contact: {
      name: 'Admin',
      email: DEV_ADMIN_EMAIL
    },
    license: {}
  },
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  paths: _paths.default,
  definitions: _definitions.default
};
exports.default = _default;