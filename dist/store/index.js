"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const app_reducer_1 = require("./reducers/app.reducer");
const AppContext = (0, react_1.createContext)({
    state: app_reducer_1.initialState,
    dispatch: () => null
});
exports.default = AppContext;
//# sourceMappingURL=index.js.map