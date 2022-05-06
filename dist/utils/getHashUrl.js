"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getHashUrl;

function getHashUrl() {
  var viewHash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var panelHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  if (panelHash.slice(0, 1) === "#") {
    return panelHash.slice(1);
  }

  return viewHash + panelHash;
}