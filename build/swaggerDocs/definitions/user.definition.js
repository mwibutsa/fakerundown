"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _faker = require("@faker-js/faker");
var _default = {
  CreateUserSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        example: _faker.faker.name.firstName()
      },
      lastName: {
        type: 'string',
        example: _faker.faker.name.lastName()
      },
      middleName: {
        type: 'string',
        example: _faker.faker.name.middleName()
      },
      email: {
        type: 'string',
        example: _faker.faker.internet.email()
      },
      phoneNumber: {
        type: 'string',
        example: _faker.faker.phone.number()
      },
      username: {
        type: 'string',
        example: _faker.faker.internet.userName()
      },
      password: {
        type: 'string',
        example: 'Password!1'
      }
    }
  },
  LoginSchema: {
    type: 'object',
    required: ['accountIdentifier', 'password'],
    properties: {
      accountIdentifier: {
        type: 'string',
        example: 'username'
      },
      password: {
        type: 'string',
        example: 'Password!1'
      }
    }
  },
  UserSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        example: _faker.faker.name.firstName()
      },
      lastName: {
        type: 'string',
        example: _faker.faker.name.lastName()
      },
      middleName: {
        type: 'string',
        example: _faker.faker.name.middleName()
      },
      email: {
        type: 'string',
        example: _faker.faker.internet.email()
      },
      phoneNumber: {
        type: 'string',
        example: _faker.faker.phone.number()
      },
      username: {
        type: 'string',
        example: _faker.faker.internet.userName()
      },
      profilePic: {
        type: 'string',
        example: _faker.faker.internet.url()
      }
    }
  }
};
exports.default = _default;