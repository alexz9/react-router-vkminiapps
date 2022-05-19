<<<<<<< HEAD
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouterActions = void 0;

var _redux = require("redux");

var _store = _interopRequireDefault(require("../store"));

var _actions = _interopRequireDefault(require("../store/actions"));

var useRouterActions = function useRouterActions() {
  var dispatch = _store["default"].dispatch;
  return (0, _redux.bindActionCreators)(_actions["default"], dispatch);
};

exports.useRouterActions = useRouterActions;
=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterActions = void 0;
const react_1 = require("react");
const store_1 = __importDefault(require("../store"));
const actions_1 = __importDefault(require("../store/actions"));
const bindActionCreators_1 = __importDefault(require("../utils/bindActionCreators"));
const useRouterActions = () => {
    const { dispatch } = (0, react_1.useContext)(store_1.default);
    return (0, react_1.useMemo)(() => (0, bindActionCreators_1.default)(actions_1.default, dispatch), []);
};
exports.useRouterActions = useRouterActions;
//# sourceMappingURL=useRouterActions.js.map
>>>>>>> context
