"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _app = require("./reducers/app.reducer");

var AppContext = /*#__PURE__*/(0, _react.createContext)({
  state: _app.initialState,
  dispatch: function dispatch() {
    return null;
  }
});
var _default = AppContext;
exports["default"] = _default;