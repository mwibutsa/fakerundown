"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyGoogleIDToken = void 0;
var _googleAuthLibrary = require("google-auth-library");
const client = new _googleAuthLibrary.OAuth2Client(String(process.env.CLIENT_ID));
const verifyGoogleIDToken = async token => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const payload = ticket.getPayload();
  if (payload) {
    return true;
  }
  return false;
};
exports.verifyGoogleIDToken = verifyGoogleIDToken;