"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterActions = void 0;

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _actions = _interopRequireDefault(require("../store/actions"));

var useRouterActions = function useRouterActions() {
  var dispatch = (0, _reactRedux.useDispatch)();
  return (0, _redux.bindActionCreators)(_actions["default"], dispatch);
};

exports.useRouterActions = useRouterActions;