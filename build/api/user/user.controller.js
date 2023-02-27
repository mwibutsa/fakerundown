"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _s = require("../../utils/s3");
var _jwt = require("../../utils/jwt");
var _statusCodes = _interopRequireDefault(require("../../constants/statusCodes"));
var _jsonResponse = _interopRequireDefault(require("../../utils/jsonResponse"));
var _models = require("../../db/models");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @author Mwibutsa Floribert
 */
class UserController {
  /**
   * @author Mwibutsa Floribert
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async createAccount(req, res) {
    const {
      body
    } = req;

    // check duplicates

    let profileURL = '';
    const existingUserEmail = await _models.UserModel.findOne({
      email: body.email
    });
    const existingUserPhoneNumber = await _models.UserModel.findOne({
      phoneNumber: body.phoneNumber
    });
    const existingUserUsername = await _models.UserModel.findOne({
      username: body.username
    });
    if (existingUserEmail || existingUserPhoneNumber || existingUserUsername) {
      return (0, _jsonResponse.default)({
        status: _statusCodes.default.HTTP_CONFLICT,
        res,
        errors: {
          email: existingUserEmail ? 'Email is already in use' : undefined,
          phoneNumber: existingUserPhoneNumber ? 'Phone number is already in use' : undefined,
          username: existingUserUsername ? 'Username is taken' : undefined
        }
      });
    }
    if (req.files && req.files.profilePic) {
      const uploadResult = await (0, _s.uploadFile)(req.files.profilePic);
      profileURL = uploadResult.Location;
    }
    const newUser = await _models.UserModel.create({
      ...body,
      profilePic: profileURL
    });
    return (0, _jsonResponse.default)({
      res,
      data: newUser,
      token: (0, _jwt.generateToken)({
        id: newUser.id
      }),
      status: _statusCodes.default.HTTP_CREATED
    });
  }

  /**
   * @author Mwibutsa Floribert
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async userLogin(req, res) {
    const {
      body
    } = req;
    const user = await _models.UserModel.findOne({
      $or: [{
        email: body.accountIdentifier
      }, {
        username: body.accountIdentifier
      }]
    });
    if (user && (await user.isValidPassword(body.password))) {
      return (0, _jsonResponse.default)({
        res,
        token: (0, _jwt.generateToken)({
          id: user.id
        }),
        data: user
      });
    }
    return (0, _jsonResponse.default)({
      res,
      message: 'Invalid account credentials',
      status: _statusCodes.default.HTTP_UNAUTHORIZED
    });
  }
}
var _default = UserController;
exports.default = _default;