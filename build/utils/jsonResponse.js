"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _statusCodes = _interopRequireDefault(require("../constants/statusCodes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {Response} Response
 */
const jsonResponse = ({
  status = _statusCodes.default.HTTP_OK,
  res,
  data,
  ...rest
}) => {
  return res.status(status).json({
    status,
    data,
    ...rest
  });
};
var _default = jsonResponse;
exports.default = _default;