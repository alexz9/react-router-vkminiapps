"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = app;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _store = require("../types/store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  popout: null,
  modal: null,
  activeView: "",
  activePanel: "",
  hash: ""
};
var router = {};

function app() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _store.EActionTypes.ROUTER_TO_POPOUT:
      router.setModal();
      return _objectSpread(_objectSpread({}, state), {}, {
        popout: action.payload
      });

    case _store.EActionTypes.ROUTER_TO_MODAL:
      router.setModal();
      return _objectSpread(_objectSpread({}, state), {}, {
        modal: action.payload
      });

    case _store.EActionTypes.ROUTER_TO_VIEW:
      router.setActiveView(action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        activeView: action.payload,
        activePanel: router.getActivePanel(),
        hash: router.getHash()
      });

    case _store.EActionTypes.ROUTER_TO_PANEL:
      router.setActivePanel(action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        activePanel: action.payload,
        hash: router.getHash()
      });

    case _store.EActionTypes.ROUTER_TO_BACK:
      router.back();
      return _objectSpread(_objectSpread({}, state), {}, {
        activeView: router.getActiveView(),
        activePanel: router.getActivePanel(),
        hash: router.getHash(),
        modal: null,
        popout: null
      });

    case _store.EActionTypes.ROUTER_TO_HASH:
      router.toHash(action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        hash: action.payload,
        activeView: router.getActiveView(),
        activePanel: router.getActivePanel()
      });

    case _store.EActionTypes.ROUTER_INIT:
      router = action.payload;
      return _objectSpread(_objectSpread({}, state), {}, {
        activeView: router.getActiveView(),
        activePanel: router.getActivePanel()
      });

    case _store.EActionTypes.ROUTER_RESET_HISTORY:
      router.resetHistory();
      return state;

    default:
      return state;
  }
}