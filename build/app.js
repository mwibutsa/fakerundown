"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.applyRoutes = exports.applyMiddleware = exports.applyErrorHandlers = void 0;
require("dotenv/config");
require("./db/dbConfig/plugins");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _celebrate = require("celebrate");
var _helmet = _interopRequireDefault(require("helmet"));
var _compression = _interopRequireDefault(require("compression"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _swaggerDocs = _interopRequireDefault(require("./swaggerDocs"));
var _statusCodes = _interopRequireDefault(require("./constants/statusCodes"));
var _dbConfig = require("./db/dbConfig");
var _api = _interopRequireDefault(require("./api"));
var _services = require("./services");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const MongoStore = (0, _connectMongodbSession.default)(_expressSession.default);
const applyMiddleware = async () => {
  const DB_URI = await (0, _dbConfig.getDBUri)();
  const sessionOptions = {
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new MongoStore({
      uri: DB_URI,
      collection: 'sessions'
    })
  };
  if (app.get('env') === 'produciton') {
    app.set('trust proxy', 1);
    sessionOptions.cookie = {
      secure: true
    };
  }
  app.use((0, _expressSession.default)(sessionOptions));
  app.use((0, _expressFileupload.default)({
    useTempFiles: true
  }));
  app.use((0, _cors.default)());
  app.use((0, _compression.default)());
  app.use((0, _morgan.default)('dev'));
  app.use((0, _helmet.default)());
  app.use(_express.default.json());
  app.use(_express.default.urlencoded({
    extended: true
  }));
};
exports.applyMiddleware = applyMiddleware;
const applyRoutes = () => {
  app.get('/', (req, res) => {
    return res.json((0, _services.generateEvent)());
  });
  app.use('/api/v1', _api.default);
  app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swaggerDocs.default));
};
exports.applyRoutes = applyRoutes;
const applyErrorHandlers = () => {
  app.use((0, _celebrate.errors)());

  // catch 404 and forward to error handler
  app.use((_, __, next) => {
    next((0, _httpErrors.default)(_statusCodes.default.HTTP_NOT_FOUND));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || _statusCodes.default.HTTP_SERVER_ERROR);
    const response = {
      message: err.message,
      error: err.status
    };
    res.send(response);
    next();
  });
};
exports.applyErrorHandlers = applyErrorHandlers;
const applyAll = async () => {
  await applyMiddleware();
  applyRoutes();
  applyErrorHandlers();
};
applyAll();
var _default = app;
exports.default = _default;
[];