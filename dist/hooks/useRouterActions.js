"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterActions = void 0;

var _react = require("react");

var _redux = require("redux");

var _store = _interopRequireDefault(require("../store"));

var _actions = _interopRequireDefault(require("../store/actions"));

var useRouterActions = function useRouterActions() {
  var _useContext = (0, _react.useContext)(_store["default"]),
      dispatch = _useContext.dispatch;

  return (0, _react.useMemo)(function () {
    return (0, _redux.bindActionCreators)(_actions["default"], dispatch);
  }, []);
};

exports.useRouterActions = useRouterActions;