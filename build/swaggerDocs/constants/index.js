"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.customResponse = void 0;
const defaultResponse = {
  400: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/ValidationResponse'
    }
  },
  404: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/notExists'
    }
  },
  401: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/unauthorizedAccess'
    }
  },
  409: {
    description: 'Bad Request',
    schema: {
      $ref: '#definitions/ConflictResponse'
    }
  }
};
const customResponse = (response = {}) => ({
  ...defaultResponse,
  ...response
});
exports.customResponse = customResponse;
var _default = defaultResponse;
exports.default = _default;