"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _app = require("../store/actions/app.actions");

var _App = require("../components/App");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function withRouter(Component) {
  var Connection = function Connection(props) {
    return /*#__PURE__*/_react["default"].createElement(Component, props);
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps, {
    context: _App.RouterContext
  })(Connection);
}

function mapStateToProps(state) {
  return _objectSpread({}, state);
}

function mapDispatchToProps(dispatch) {
  return _objectSpread({}, (0, _redux.bindActionCreators)({
    toPopout: _app.toPopout,
    toModal: _app.toModal,
    toView: _app.toView,
    toPanel: _app.toPanel,
    toBack: _app.toBack,
    toHash: _app.toHash,
    resetHistory: _app.resetHistory
  }, dispatch));
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return _objectSpread({
    router: _objectSpread(_objectSpread({}, stateProps), dispatchProps)
  }, ownProps);
}

var _default = withRouter;
exports["default"] = _default;