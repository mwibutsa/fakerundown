"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatObjectPlugin = exports.formatJSONPlugin = exports.findOrCreatePlugin = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-param-reassign */
const findOrCreatePlugin = function (schema) {
  schema.statics.findOrCreate = async function (condition, doc = null) {
    const res = await this.findOne(condition);
    return res || this.create(doc ?? condition);
  };
};
exports.findOrCreatePlugin = findOrCreatePlugin;
const formatJSONPlugin = function (schema) {
  schema.options.toJSON = {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if ('password' in ret) {
        delete ret?.password;
      }
      return ret;
    },
    virtuals: true
  };
};
exports.formatJSONPlugin = formatJSONPlugin;
const formatObjectPlugin = function (schema) {
  schema.options.toObject = {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true
  };
};
exports.formatObjectPlugin = formatObjectPlugin;
_mongoose.default.plugin(findOrCreatePlugin);
_mongoose.default.plugin(formatJSONPlugin);
_mongoose.default.plugin(formatObjectPlugin);