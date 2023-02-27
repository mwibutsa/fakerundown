"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameController = void 0;
var _services = require("../../services");
var _models = require("../../db/models");
var _jsonResponse = _interopRequireDefault(require("../../utils/jsonResponse"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GameController {
  static async generateGames(req, res) {
    const games = Array.from({
      length: 10
    }, _services.generateEvent);
    await _models.GameEventModel.insertMany(games);
    return (0, _jsonResponse.default)({
      res,
      message: 'Games loaded',
      data: games
    });
  }
  static async getGames(req, res) {
    const games = await _models.GameEventModel.find({
      $and: [{
        event_date: {
          $gte: new Date(new Date(req.params.date).setHours(0, 0, 0))
        }
      }, {
        event_date: {
          $lte: new Date(new Date(req.params.date).setHours(23, 59, 59))
        }
      }]
    });
    return (0, _jsonResponse.default)({
      res,
      message: 'Games loaded',
      data: games
    });
  }
}
exports.GameController = GameController;