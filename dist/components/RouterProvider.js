"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const app_actions_1 = require("../store/actions/app.actions");
const router_1 = __importDefault(require("../utils/router"));
const store_1 = __importDefault(require("../store"));
const reducers_1 = __importDefault(require("../store/reducers"));
const app_reducer_1 = require("../store/reducers/app.reducer");
const RouterProvider = ({ structure, children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducers_1.default, app_reducer_1.initialState);
    (0, react_1.useEffect)(() => {
        try {
            const router = new router_1.default(structure);
            const hash = window.location.hash.slice(1);
            router.toHash(hash);
            dispatch((0, app_actions_1.routerInit)(router));
        }
        catch (error) {
            throw new Error("Incorrect structure! Check your application structure.");
        }
        const back = () => dispatch((0, app_actions_1.toBack)());
        window.addEventListener("popstate", back);
        return () => window.removeEventListener("popstate", back);
    }, []);
    return ((0, jsx_runtime_1.jsx)(store_1.default.Provider, Object.assign({ value: { state, dispatch } }, { children: children })));
};
exports.default = RouterProvider;
//# sourceMappingURL=RouterProvider.js.map