"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _faker = require("@faker-js/faker");
var _default = {
  newUser: {
    firstName: _faker.faker.name.firstName(),
    lastName: _faker.faker.name.lastName(),
    email: 'newuser@gmail.com',
    phoneNumber: '0987654321',
    password: 'Password@1',
    username: 'newUser'
  },
  newUser2: {
    firstName: _faker.faker.name.firstName(),
    lastName: _faker.faker.name.lastName(),
    email: 'newuser2@gmail.com',
    phoneNumber: '01987654321',
    password: 'Password@1',
    username: 'newUser1'
  },
  existingUser: {
    firstName: _faker.faker.name.firstName(),
    lastName: _faker.faker.name.lastName(),
    email: 'existinguseremail@gmail.com',
    phoneNumber: '09876543331',
    password: 'Password@1',
    username: 'existingUser'
  },
  newProfileInfo: {
    firstName: _faker.faker.name.firstName(),
    lastName: _faker.faker.name.lastName(),
    email: 'newprofile@gmail.com',
    phoneNumber: '1122076543331',
    username: 'new_profile_username'
  },
  profileUpdate: {
    firstName: _faker.faker.name.firstName(),
    lastName: _faker.faker.name.lastName(),
    email: 'existinguseremail-changed@gmail.com',
    phoneNumber: '09976543331',
    username: 'changed_username'
  }
};
exports.default = _default;