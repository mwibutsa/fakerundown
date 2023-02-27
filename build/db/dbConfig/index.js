"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnect = dbConnect;
exports.dbConnection = void 0;
exports.dbDisconnect = dbDisconnect;
exports.getDBUri = getDBUri;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongodbMemoryServer = require("mongodb-memory-server");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mongoServer = _mongodbMemoryServer.MongoMemoryServer.create();
/**
 * @author Mwibutsa Floribert
 * @returns {Promise} -
 */
async function dbConnect() {
  let dbUri = process.env.MONGO_DB_URI || '';
  const mongooseOptions = {
    autoIndex: true
  };
  if (String(process.env.NODE_ENV).toLowerCase() === 'test') {
    dbUri = (await mongoServer).getUri();
  }
  await _mongoose.default.connect(`${dbUri}`, mongooseOptions);
}

/**
 * @author Mwibutsa Floribert
 * @returns {Promise} -
 */
async function dbDisconnect() {
  await _mongoose.default.connection.dropDatabase();
  await _mongoose.default.connection.close();
  await (await mongoServer).stop();
}

/**
 * @author  Mwibutsa Floribert
 * @returns {Promise} --
 */
async function getDBUri() {
  let uri = process.env.MONGO_DB_URI;
  if (String(process.env.NODE_ENV).toLowerCase() === 'test') {
    uri = (await mongoServer).getUri();
  }
  return String(uri);
}
const dbConnection = _mongoose.default.connection;
exports.dbConnection = dbConnection;