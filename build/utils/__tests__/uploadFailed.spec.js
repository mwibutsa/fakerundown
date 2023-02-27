"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _s = require("../s3");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable require-jsdoc */

jest.mock('fs');
_fs.default.createReadStream = jest.fn().mockReturnValue(null);
jest.mock('aws-sdk', () => {
  class mockS3 {
    constructor() {
      this.upload = jest.fn().mockImplementation((_filePath, callback) => callback(new Error('Failed to upload')));
    }
  }
  return {
    config: {
      update: jest.fn()
    },
    S3: mockS3
  };
});
describe('TEST UTILS', () => {
  it('Should throw an exception when a file can not be uploaded', async () => {
    try {
      await (0, _s.uploadFile)({
        tempFilePath: 'test_url'
      });
    } catch (error) {
      expect(error.message).toBe('Failed to upload');
    }
  });
});