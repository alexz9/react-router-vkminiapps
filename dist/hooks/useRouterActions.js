"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterActions = void 0;

var _redux = require("redux");

var _store = _interopRequireDefault(require("../store"));

var _actions = _interopRequireDefault(require("../store/actions"));

var useRouterActions = function useRouterActions() {
  var dispatch = _store["default"].dispatch;
  return (0, _redux.bindActionCreators)(_actions["default"], dispatch);
};

exports.useRouterActions = useRouterActions;