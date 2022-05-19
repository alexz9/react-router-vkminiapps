"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Router_instances, _Router_hash, _Router_activeView, _Router_activePanel, _Router_views, _Router_historyPanels, _Router_historyViews, _Router_setLocationHash;
Object.defineProperty(exports, "__esModule", { value: true });
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
const getHashUrl_1 = __importDefault(require("./getHashUrl"));
class Router {
    constructor(structure) {
        _Router_instances.add(this);
        _Router_hash.set(this, void 0);
        _Router_activeView.set(this, void 0);
        _Router_activePanel.set(this, void 0);
        _Router_views.set(this, void 0);
        _Router_historyPanels.set(this, void 0);
        _Router_historyViews.set(this, void 0);
        this.structure = structure;
        __classPrivateFieldSet(this, _Router_hash, "", "f");
        __classPrivateFieldSet(this, _Router_activeView, structure[0].id, "f");
        __classPrivateFieldSet(this, _Router_activePanel, structure[0].panels[0].id, "f");
        // объект views для быстрого доступа по id с одной активной панелью
        __classPrivateFieldSet(this, _Router_views, structure.reduce((accum, item) => {
            accum[item.id] = Object.assign(Object.assign({}, item), { panel: item.panels[0] });
            return accum;
        }, {}), "f");
        // история панелей, добавляем первую для каждого views
        __classPrivateFieldSet(this, _Router_historyPanels, structure.reduce((accum, item) => {
            accum[item.id] = [item.panels[0]];
            return accum;
        }, {}), "f");
        // история views, добавляем первую
        __classPrivateFieldSet(this, _Router_historyViews, [__classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")]], "f");
    }
    setModal() {
        const history = __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")];
        if (history.length > 0 && history[history.length - 1].id === "route_modal") {
            return;
        }
        window.history.pushState({ route: "route_modal" }, "route_modal");
        __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].push({ id: "route_modal" });
    }
    setActiveView(id) {
        const panel = __classPrivateFieldGet(this, _Router_views, "f")[id].panel;
        __classPrivateFieldSet(this, _Router_activeView, id, "f");
        __classPrivateFieldSet(this, _Router_activePanel, panel.id, "f");
        __classPrivateFieldGet(this, _Router_historyViews, "f").push(__classPrivateFieldGet(this, _Router_views, "f")[id]);
        window.history.pushState({ route: id }, id);
        const hash = (0, getHashUrl_1.default)(__classPrivateFieldGet(this, _Router_views, "f")[id].hash, panel.hash);
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_setLocationHash).call(this, hash);
    }
    setActivePanel(panel) {
        const index = __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panels.findIndex((item) => item.id === panel);
        __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")] = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")]), { panel: __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panels[index] });
        __classPrivateFieldSet(this, _Router_activePanel, panel, "f");
        __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].push(__classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel);
        window.history.pushState({ route: panel }, panel);
        const hash = (0, getHashUrl_1.default)(__classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].hash, __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel.hash);
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_setLocationHash).call(this, hash);
    }
    back() {
        if (__classPrivateFieldGet(this, _Router_historyViews, "f").length === 0) {
            return;
        }
        if (__classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].length > 1) {
            const lastPanel = __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].pop();
            if (lastPanel.id === "route_modal") {
                return;
            }
            __classPrivateFieldSet(this, _Router_activePanel, __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")][__classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].length - 1].id, "f");
            __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel = __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")][__classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].length - 1];
        }
        else if (__classPrivateFieldGet(this, _Router_historyViews, "f").length > 1) {
            __classPrivateFieldGet(this, _Router_historyViews, "f").pop();
            __classPrivateFieldSet(this, _Router_activeView, __classPrivateFieldGet(this, _Router_historyViews, "f")[__classPrivateFieldGet(this, _Router_historyViews, "f").length - 1].id, "f");
            __classPrivateFieldSet(this, _Router_activePanel, __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel.id, "f");
        }
        const hash = (0, getHashUrl_1.default)(__classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].hash, __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel.hash);
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_setLocationHash).call(this, hash);
    }
    toHash(hash) {
        const { structure } = this;
        if (!hash.trim()) {
            return;
        }
        loop: for (let i = 0; i < structure.length; i++) {
            for (let k = 0; k < structure[i].panels.length; k++) {
                const h = (0, getHashUrl_1.default)(structure[i].hash, structure[i].panels[k].hash);
                // хеш подходит под заданную структуру, меняем состояние активных вивок и панелей
                if (h === hash) {
                    __classPrivateFieldSet(this, _Router_activeView, structure[i].id, "f");
                    __classPrivateFieldSet(this, _Router_activePanel, structure[i].panels[k].id, "f");
                    __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel = structure[i].panels[k];
                    __classPrivateFieldSet(this, _Router_hash, h, "f");
                    // не первая панель, добавляем в историю для возврата
                    if (k > 0) {
                        __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].push(structure[i].panels[k]);
                        window.history.pushState({ route: __classPrivateFieldGet(this, _Router_activePanel, "f") }, __classPrivateFieldGet(this, _Router_activePanel, "f"));
                    }
                    break loop;
                }
            }
        }
    }
    resetHistory() {
        // история панелей
        let counter = 0;
        for (let key in __classPrivateFieldGet(this, _Router_historyPanels, "f")) {
            counter += __classPrivateFieldGet(this, _Router_historyPanels, "f")[key].length - 1;
            __classPrivateFieldGet(this, _Router_historyPanels, "f")[key] = __classPrivateFieldGet(this, _Router_historyPanels, "f")[key].slice(0, 1);
        }
        __classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].panel = __classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")][__classPrivateFieldGet(this, _Router_historyPanels, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")].length - 1];
        // история views
        __classPrivateFieldSet(this, _Router_historyViews, [__classPrivateFieldGet(this, _Router_views, "f")[__classPrivateFieldGet(this, _Router_activeView, "f")]], "f");
        window.history.go(-counter);
    }
    get activeView() {
        return __classPrivateFieldGet(this, _Router_activeView, "f");
    }
    get activePanel() {
        return __classPrivateFieldGet(this, _Router_activePanel, "f");
    }
    get hash() {
        return __classPrivateFieldGet(this, _Router_hash, "f");
    }
}
_Router_hash = new WeakMap(), _Router_activeView = new WeakMap(), _Router_activePanel = new WeakMap(), _Router_views = new WeakMap(), _Router_historyPanels = new WeakMap(), _Router_historyViews = new WeakMap(), _Router_instances = new WeakSet(), _Router_setLocationHash = function _Router_setLocationHash(hash) {
    if (__classPrivateFieldGet(this, _Router_hash, "f") !== hash) {
        vk_bridge_1.default.send("VKWebAppSetLocation", { location: hash });
        __classPrivateFieldSet(this, _Router_hash, hash, "f");
    }
};
;
exports.default = Router;
