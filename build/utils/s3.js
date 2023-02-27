"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bucketName = String(process.env.AWS_S3_BUCKET_NAME);
const region = String(process.env.AWS_S3_BUCKET_REGION);
_awsSdk.default.config.update({
  region
});
const s3 = new _awsSdk.default.S3({
  apiVersion: 'latest'
});
const uploadFile = file => {
  return new Promise((resolve, reject) => {
    const fileItem = !Array.isArray(file) ? file : file[0];
    const fileStream = _fs.default.createReadStream(fileItem.tempFilePath);
    return s3.upload({
      Body: fileStream,
      Key: fileItem.name,
      Bucket: bucketName
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      // clear tmp directory
      _fs.default.rmSync(_path.default.join(__dirname, '..', '..', 'tmp'), {
        recursive: true,
        force: true
      });
    });
  });
};
exports.uploadFile = uploadFile;