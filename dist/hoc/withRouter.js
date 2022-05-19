"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = __importDefault(require("../store"));
const actions_1 = __importDefault(require("../store/actions"));
const bindActionCreators_1 = __importDefault(require("../utils/bindActionCreators"));
function withRouter(Component) {
    return (props) => {
        const { state, dispatch } = (0, react_1.useContext)(store_1.default);
        const bindActions = (0, react_1.useMemo)(() => (0, bindActionCreators_1.default)(actions_1.default, dispatch), []);
        return (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { router: Object.assign(Object.assign({}, state), bindActions) }));
    };
}
exports.default = withRouter;
