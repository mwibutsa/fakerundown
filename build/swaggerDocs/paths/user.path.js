"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _faker = require("@faker-js/faker");
var _constants = require("../constants");
var _default = {
  '/users/sign-up': {
    post: {
      tags: ['User'],
      summary: 'Create user account',
      parameters: [{
        in: 'formData',
        type: 'string',
        name: 'firstName',
        required: true,
        default: _faker.faker.name.firstName()
      }, {
        in: 'formData',
        type: 'string',
        name: 'lastName',
        required: true,
        default: _faker.faker.name.lastName()
      }, {
        in: 'formData',
        type: 'string',
        name: 'email',
        required: true,
        default: _faker.faker.internet.email()
      }, {
        in: 'formData',
        type: 'string',
        name: 'username',
        default: 'username'
      }, {
        in: 'formData',
        type: 'string',
        name: 'phoneNumber',
        default: _faker.faker.phone.number()
      }, {
        in: 'formData',
        type: 'string',
        name: 'password',
        required: true,
        default: 'Password!1'
      }, {
        in: 'formData',
        type: 'file',
        name: 'profilePic'
      }],
      responses: (0, _constants.customResponse)({
        201: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 201
              },
              data: {
                $ref: '#/definitions/UserSchema'
              },
              token: {
                type: 'string'
              }
            }
          }
        }
      })
    }
  },
  '/users/login': {
    post: {
      tags: ['User'],
      summary: 'User login',
      parameters: [{
        in: 'body',
        name: 'body',
        schema: {
          $ref: '#/definitions/LoginSchema'
        }
      }],
      responses: (0, _constants.customResponse)({
        200: {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'int32',
                example: 200
              },
              data: {
                $ref: '#/definitions/UserSchema'
              },
              token: {
                type: 'string'
              }
            }
          }
        }
      })
    }
  }
};
exports.default = _default;