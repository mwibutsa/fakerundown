"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  PaginationSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        example: 1
      },
      totalItems: {
        type: 'number',
        example: 110
      },
      perPage: {
        type: 'number',
        example: 10
      },
      totalPages: {
        type: 'number',
        example: 11
      }
    }
  }
};
exports.default = _default;