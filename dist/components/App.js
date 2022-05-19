"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RouterProvider = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _app = require("../store/actions/app.actions");

var _router = _interopRequireDefault(require("../utils/router"));

var _store = _interopRequireDefault(require("../store"));

var _reducers = _interopRequireDefault(require("../store/reducers"));

var _app2 = require("../store/reducers/app.reducer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RouterProvider = function RouterProvider(_ref) {
  var structure = _ref.structure,
      children = _ref.children;

  var _useReducer = (0, _react.useReducer)(_reducers["default"], _app2.initialState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  try {
    var router = new _router["default"](structure);
    var hash = window.location.hash.slice(1);
    router.toHash(hash);
    dispatch((0, _app.routerInit)(router));
  } catch (error) {
    throw new Error("Incorrect structure! Check your application structure.");
  }

  (0, _react.useEffect)(function () {
    var back = function back() {
      return dispatch((0, _app.toBack)());
    };

    window.addEventListener("popstate", back);
    return function () {
      return window.removeEventListener("popstate", back);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_store["default"].Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};

exports.RouterProvider = RouterProvider;
var _default = RouterProvider;
exports["default"] = _default;