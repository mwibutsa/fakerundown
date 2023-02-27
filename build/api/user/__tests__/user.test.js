"use strict";

var _supertest = _interopRequireDefault(require("supertest"));
var _models = require("../../../db/models");
var _dbConfig = require("../../../db/dbConfig");
var _statusCodes = _interopRequireDefault(require("../../../constants/statusCodes"));
var _user = _interopRequireDefault(require("../../../testData/user"));
var _app = _interopRequireDefault(require("../../../app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const request = (0, _supertest.default)(_app.default);
describe('USER', () => {
  beforeAll(async () => {
    await (0, _dbConfig.dbConnect)();
    await _models.UserModel.create({
      ..._user.default.existingUser
    });
  });
  afterAll(async () => {
    await (0, _dbConfig.dbDisconnect)();
  });
  it('Should be able to create user account', async () => {
    const {
      body,
      status
    } = await request.post('/api/v1/users/sign-up').send({
      ..._user.default.newUser
    });
    expect(status).toBe(_statusCodes.default.HTTP_CREATED);
    expect(body.data.username).toBe(_user.default.newUser.username);
    expect(body).toHaveProperty('token');
  });
  it('Should be able to validate user account creation', async () => {
    const userClone = {
      ..._user.default.newUser
    };
    const {
      body,
      status
    } = await request.post('/api/v1/users/sign-up').send({
      ...userClone,
      email: '',
      username: ''
    });
    expect(status).toBe(_statusCodes.default.HTTP_BAD_REQUEST);
    expect(body.message).toBe('Validation failed');
  });
  it('Should not be able to create duplicate user account', async () => {
    const userClone = {
      ..._user.default.existingUser
    };
    const {
      body,
      status
    } = await request.post('/api/v1/users/sign-up').send({
      ...userClone
    });
    expect(status).toBe(_statusCodes.default.HTTP_CONFLICT);
    expect(body.errors.email.length).toBeGreaterThan(3);
  });
  it('Should be able to log into user account and generate Token', async () => {
    const {
      body,
      status
    } = await request.post('/api/v1/users/login').send({
      accountIdentifier: _user.default.existingUser.username,
      password: _user.default.existingUser.password
    });
    expect(status).toBe(_statusCodes.default.HTTP_OK);
    expect(body).toHaveProperty('token');
    expect(body.data.username).toBe(_user.default.existingUser.username);
  });
  it('Should not proceed with invalid credentials', async () => {
    const {
      body,
      status
    } = await request.post('/api/v1/users/login').send({
      accountIdentifier: `${new Date().getTime()}`,
      password: `${new Date().getTime()}`
    });
    expect(status).toBe(_statusCodes.default.HTTP_UNAUTHORIZED);
    expect(body.message).toBe('Invalid account credentials');
  });
});