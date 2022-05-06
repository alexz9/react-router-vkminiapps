"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

var _getHashUrl = _interopRequireDefault(require("./getHashUrl"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _hash = /*#__PURE__*/new WeakMap();

var _activeView = /*#__PURE__*/new WeakMap();

var _activePanel = /*#__PURE__*/new WeakMap();

var _views = /*#__PURE__*/new WeakMap();

var _historyPanels = /*#__PURE__*/new WeakMap();

var _historyViews = /*#__PURE__*/new WeakMap();

var Router = /*#__PURE__*/function () {
  function Router(structure) {
    (0, _classCallCheck2["default"])(this, Router);
    (0, _defineProperty2["default"])(this, "structure", void 0);

    _hash.set(this, {
      writable: true,
      value: void 0
    });

    _activeView.set(this, {
      writable: true,
      value: void 0
    });

    _activePanel.set(this, {
      writable: true,
      value: void 0
    });

    _views.set(this, {
      writable: true,
      value: void 0
    });

    _historyPanels.set(this, {
      writable: true,
      value: void 0
    });

    _historyViews.set(this, {
      writable: true,
      value: void 0
    });

    this.structure = structure;
    (0, _classPrivateFieldSet2["default"])(this, _hash, "");
    (0, _classPrivateFieldSet2["default"])(this, _activeView, structure[0].id);
    (0, _classPrivateFieldSet2["default"])(this, _activePanel, structure[0].panels[0].id); // объект views для быстрого доступа по id с одной активной панелью

    (0, _classPrivateFieldSet2["default"])(this, _views, structure.reduce(function (accum, item) {
      accum[item.id] = _objectSpread(_objectSpread({}, item), {}, {
        panel: item.panels[0]
      });
      return accum;
    }, {})); // история панелей, добавляем первую для каждого views

    (0, _classPrivateFieldSet2["default"])(this, _historyPanels, structure.reduce(function (accum, item) {
      accum[item.id] = [item.panels[0]];
      return accum;
    }, {})); // история views, добавляем первую

    (0, _classPrivateFieldSet2["default"])(this, _historyViews, [(0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)]]);
  }

  (0, _createClass2["default"])(Router, [{
    key: "setModal",
    value: function setModal() {
      var history = (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)];

      if (history.length > 0 && history[history.length - 1].id === "route_modal") {
        return;
      }

      window.history.pushState({
        route: "route_modal"
      }, "route_modal");
      (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].push({
        id: "route_modal"
      });
    }
  }, {
    key: "setActiveView",
    value: function setActiveView(id) {
      var panel = (0, _classPrivateFieldGet2["default"])(this, _views)[id].panel;
      (0, _classPrivateFieldSet2["default"])(this, _activeView, id);
      (0, _classPrivateFieldSet2["default"])(this, _activePanel, panel.id);
      (0, _classPrivateFieldGet2["default"])(this, _historyViews).push((0, _classPrivateFieldGet2["default"])(this, _views)[id]);
      var hash = (0, _getHashUrl["default"])((0, _classPrivateFieldGet2["default"])(this, _views)[id].hash, panel.hash);
      window.history.pushState({
        route: id
      }, id);

      if ((0, _classPrivateFieldGet2["default"])(this, _hash) !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        (0, _classPrivateFieldSet2["default"])(this, _hash, hash);
      }
    }
  }, {
    key: "setActivePanel",
    value: function setActivePanel(panel) {
      var index = (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panels.findIndex(function (item) {
        return item.id === panel;
      });
      (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)] = _objectSpread(_objectSpread({}, (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)]), {}, {
        panel: (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panels[index]
      });
      (0, _classPrivateFieldSet2["default"])(this, _activePanel, panel);
      (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].push((0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel);
      var hash = (0, _getHashUrl["default"])((0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].hash, (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel.hash);
      window.history.pushState({
        route: panel
      }, panel);

      if ((0, _classPrivateFieldGet2["default"])(this, _hash) !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        (0, _classPrivateFieldSet2["default"])(this, _hash, hash);
      }
    }
  }, {
    key: "back",
    value: function back() {
      if ((0, _classPrivateFieldGet2["default"])(this, _historyViews).length === 0) {
        return;
      }

      if ((0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].length > 1) {
        var lastPanel = (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].pop();

        if (lastPanel.id === "route_modal") {
          return;
        }

        (0, _classPrivateFieldSet2["default"])(this, _activePanel, (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)][(0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].length - 1].id);
        (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel = (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)][(0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].length - 1];
      } else if ((0, _classPrivateFieldGet2["default"])(this, _historyViews).length > 1) {
        (0, _classPrivateFieldGet2["default"])(this, _historyViews).pop();
        (0, _classPrivateFieldSet2["default"])(this, _activeView, (0, _classPrivateFieldGet2["default"])(this, _historyViews)[(0, _classPrivateFieldGet2["default"])(this, _historyViews).length - 1].id);
        (0, _classPrivateFieldSet2["default"])(this, _activePanel, (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel.id);
      }

      var hash = (0, _getHashUrl["default"])((0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].hash, (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel.hash);

      if ((0, _classPrivateFieldGet2["default"])(this, _hash) !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        (0, _classPrivateFieldSet2["default"])(this, _hash, hash);
      }
    }
  }, {
    key: "toHash",
    value: function toHash(hash) {
      var structure = this.structure;

      if (!hash.trim()) {
        return;
      }

      loop: for (var i = 0; i < structure.length; i++) {
        for (var k = 0; k < structure[i].panels.length; k++) {
          var h = (0, _getHashUrl["default"])(structure[i].hash, structure[i].panels[k].hash); // хеш подходит под заданную структуру, меняем состояние активных вивок и панелей

          if (h === hash) {
            (0, _classPrivateFieldSet2["default"])(this, _activeView, structure[i].id);
            (0, _classPrivateFieldSet2["default"])(this, _activePanel, structure[i].panels[k].id);
            (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel = structure[i].panels[k];
            (0, _classPrivateFieldSet2["default"])(this, _hash, h); // не первая панель, добавляем в историю для возврата

            if (k > 0) {
              (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].push(structure[i].panels[k]);
              window.history.pushState({
                route: (0, _classPrivateFieldGet2["default"])(this, _activePanel)
              }, (0, _classPrivateFieldGet2["default"])(this, _activePanel));
            }

            break loop;
          }
        }
      }
    }
  }, {
    key: "resetHistory",
    value: function resetHistory() {
      // история панелей
      var counter = 0;

      for (var key in (0, _classPrivateFieldGet2["default"])(this, _historyPanels)) {
        counter += (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[key].length - 1;
        (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[key] = (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[key].slice(0, 1);
      }

      (0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].panel = (0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)][(0, _classPrivateFieldGet2["default"])(this, _historyPanels)[(0, _classPrivateFieldGet2["default"])(this, _activeView)].length - 1]; // история views

      (0, _classPrivateFieldSet2["default"])(this, _historyViews, [(0, _classPrivateFieldGet2["default"])(this, _views)[(0, _classPrivateFieldGet2["default"])(this, _activeView)]]);
      window.history.go(-counter);
    }
  }, {
    key: "activeView",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _activeView);
    }
  }, {
    key: "activePanel",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _activePanel);
    }
  }, {
    key: "hash",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _hash);
    }
  }]);
  return Router;
}();

;
var _default = Router;
exports["default"] = _default;