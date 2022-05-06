"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetHistory = exports.routerInit = exports.toHash = exports.toBack = exports.toModal = exports.toPanel = exports.toView = exports.toPopout = void 0;

var _store = require("../../types/store");

var toPopout = function toPopout(payload) {
  return {
    type: _store.EActionTypes.ROUTER_TO_POPOUT,
    payload: payload
  };
};

exports.toPopout = toPopout;

var toView = function toView(payload) {
  return {
    type: _store.EActionTypes.ROUTER_TO_VIEW,
    payload: payload
  };
};

exports.toView = toView;

var toPanel = function toPanel(payload) {
  return {
    type: _store.EActionTypes.ROUTER_TO_PANEL,
    payload: payload
  };
};

exports.toPanel = toPanel;

var toModal = function toModal(payload) {
  return {
    type: _store.EActionTypes.ROUTER_TO_MODAL,
    payload: payload
  };
};

exports.toModal = toModal;

var toBack = function toBack() {
  return {
    type: _store.EActionTypes.ROUTER_TO_BACK
  };
};

exports.toBack = toBack;

var toHash = function toHash(payload) {
  return {
    type: _store.EActionTypes.ROUTER_TO_HASH,
    payload: payload
  };
};

exports.toHash = toHash;

var routerInit = function routerInit(payload) {
  return {
    type: _store.EActionTypes.ROUTER_INIT,
    payload: payload
  };
};

exports.routerInit = routerInit;

var resetHistory = function resetHistory() {
  return {
    type: _store.EActionTypes.ROUTER_RESET_HISTORY
  };
};

exports.resetHistory = resetHistory;