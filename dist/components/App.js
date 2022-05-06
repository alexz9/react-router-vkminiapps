"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RouterContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _app = require("../store/actions/app.actions");

var _router = _interopRequireDefault(require("../utils/router"));

var _store = _interopRequireDefault(require("../store"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RouterContext = /*#__PURE__*/_react["default"].createContext(null);

exports.RouterContext = RouterContext;

var App = function App(_ref) {
  var structure = _ref.structure,
      children = _ref.children;

  try {
    var router = new _router["default"](structure);
    var hash = window.location.hash.slice(1);
    router.toHash(hash);

    _store["default"].dispatch((0, _app.routerInit)(router));
  } catch (error) {
    throw new Error("Incorrect structure! Check your application structure.");
  }

  (0, _react.useEffect)(function () {
    window.addEventListener("popstate", function () {
      return _store["default"].dispatch((0, _app.toBack)());
    });
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
    store: _store["default"],
    context: RouterContext
  }, children);
};

var _default = App;
exports["default"] = _default;