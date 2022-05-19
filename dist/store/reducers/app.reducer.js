"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = void 0;
const store_1 = require("../../types/store");
exports.initialState = {
    popout: null,
    modal: null,
    activeView: "",
    activePanel: "",
    hash: ""
};
let router;
function app(state = exports.initialState, action) {
    switch (action.type) {
        case store_1.EActionTypes.ROUTER_TO_POPOUT:
            router.setModal();
            return Object.assign(Object.assign({}, state), { popout: action.payload });
        case store_1.EActionTypes.ROUTER_TO_MODAL:
            router.setModal();
            return Object.assign(Object.assign({}, state), { modal: action.payload });
        case store_1.EActionTypes.ROUTER_TO_VIEW:
            router.setActiveView(action.payload);
            return Object.assign(Object.assign({}, state), { activeView: action.payload, activePanel: router.activePanel, hash: router.hash });
        case store_1.EActionTypes.ROUTER_TO_PANEL:
            router.setActivePanel(action.payload);
            return Object.assign(Object.assign({}, state), { activePanel: action.payload, hash: router.hash });
        case store_1.EActionTypes.ROUTER_TO_BACK:
            router.back();
            return Object.assign(Object.assign({}, state), { activeView: router.activeView, activePanel: router.activePanel, hash: router.hash, modal: null, popout: null });
        case store_1.EActionTypes.ROUTER_TO_HASH:
            router.toHash(action.payload);
            return Object.assign(Object.assign({}, state), { hash: action.payload, activeView: router.activeView, activePanel: router.activePanel });
        case store_1.EActionTypes.ROUTER_INIT:
            router = action.payload;
            return Object.assign(Object.assign({}, state), { activeView: router.activeView, activePanel: router.activePanel });
        case store_1.EActionTypes.ROUTER_RESET_HISTORY:
            router.resetHistory();
            return state;
        default:
            return state;
    }
}
exports.default = app;
//# sourceMappingURL=app.reducer.js.map