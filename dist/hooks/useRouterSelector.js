"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterSelector = void 0;

var _react = require("react");

var _store = _interopRequireDefault(require("../store"));

var useRouterSelector = function useRouterSelector() {
  var _useContext = (0, _react.useContext)(_store["default"]),
      state = _useContext.state;

  return state;
};

exports.useRouterSelector = useRouterSelector;