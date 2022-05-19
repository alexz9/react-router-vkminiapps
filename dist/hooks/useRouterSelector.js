"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterSelector = void 0;

var _react = require("react");

var _store = _interopRequireDefault(require("../store"));

var useRouterSelector = function useRouterSelector() {
  var state = (0, _react.useMemo)(function () {
    return _store["default"].getState();
  }, [_store["default"].getState()]);
  return state;
};

exports.useRouterSelector = useRouterSelector;