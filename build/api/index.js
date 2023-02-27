"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("./user/user.routes"));
var _games = require("./games/games.controller");
var _requestWrapper = _interopRequireDefault(require("../middleware/requestWrapper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.get('/generate-games', (0, _requestWrapper.default)(_games.GameController.generateGames));
router.get('/get-games/:date', (0, _requestWrapper.default)(_games.GameController.getGames));
router.use('/users', _user.default);
var _default = router;
exports.default = _default;