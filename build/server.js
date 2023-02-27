"use strict";

var _http = _interopRequireDefault(require("http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _dbConfig = require("./db/dbConfig");
var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const server = _http.default.createServer(_app.default);
const PORT = process.env.PORT || 4000;
Promise.all([_dotenv.default.config(), (0, _dbConfig.dbConnect)()]).then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port: ${PORT}`);
  });
});