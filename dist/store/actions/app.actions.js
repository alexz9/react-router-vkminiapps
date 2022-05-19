"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetHistory = exports.routerInit = exports.toHash = exports.toBack = exports.toModal = exports.toPanel = exports.toView = exports.toPopout = void 0;
const store_1 = require("../../types/store");
const toPopout = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_TO_POPOUT,
        payload
    };
};
exports.toPopout = toPopout;
const toView = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_TO_VIEW,
        payload
    };
};
exports.toView = toView;
const toPanel = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_TO_PANEL,
        payload
    };
};
exports.toPanel = toPanel;
const toModal = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_TO_MODAL,
        payload
    };
};
exports.toModal = toModal;
const toBack = function () {
    return {
        type: store_1.EActionTypes.ROUTER_TO_BACK
    };
};
exports.toBack = toBack;
const toHash = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_TO_HASH,
        payload
    };
};
exports.toHash = toHash;
const routerInit = function (payload) {
    return {
        type: store_1.EActionTypes.ROUTER_INIT,
        payload
    };
};
exports.routerInit = routerInit;
const resetHistory = function () {
    return {
        type: store_1.EActionTypes.ROUTER_RESET_HISTORY
    };
};
exports.resetHistory = resetHistory;
//# sourceMappingURL=app.actions.js.map