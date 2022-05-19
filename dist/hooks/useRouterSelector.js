"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterSelector = void 0;
const react_1 = require("react");
const store_1 = __importDefault(require("../store"));
const useRouterSelector = () => {
    const { state } = (0, react_1.useContext)(store_1.default);
    return state;
};
exports.useRouterSelector = useRouterSelector;
//# sourceMappingURL=useRouterSelector.js.map