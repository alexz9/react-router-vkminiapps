"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _vkBridge = _interopRequireDefault(require("@vkontakte/vk-bridge"));

var _getHashUrl = _interopRequireDefault(require("./getHashUrl"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Router = /*#__PURE__*/function () {
  function Router(structure) {
    (0, _classCallCheck2["default"])(this, Router);
    (0, _defineProperty2["default"])(this, "structure", void 0);
    (0, _defineProperty2["default"])(this, "hash", void 0);
    (0, _defineProperty2["default"])(this, "activeView", void 0);
    (0, _defineProperty2["default"])(this, "activePanel", void 0);
    (0, _defineProperty2["default"])(this, "views", void 0);
    (0, _defineProperty2["default"])(this, "historyPanels", void 0);
    (0, _defineProperty2["default"])(this, "historyViews", void 0);
    this.structure = structure;
    this.hash = "";
    this.activeView = structure[0].id;
    this.activePanel = structure[0].panels[0].id; // объект views для быстрого доступа по id с одной активной панелью

    this.views = structure.reduce(function (accum, item) {
      accum[item.id] = _objectSpread(_objectSpread({}, item), {}, {
        panel: item.panels[0]
      });
      return accum;
    }, {}); // история панелей, добавляем первую для каждого views

    this.historyPanels = structure.reduce(function (accum, item) {
      accum[item.id] = [item.panels[0]];
      return accum;
    }, {}); // история views, добавляем первую

    this.historyViews = [this.views[this.activeView]];
  }

  (0, _createClass2["default"])(Router, [{
    key: "getActiveView",
    value: function getActiveView() {
      return this.activeView;
    }
  }, {
    key: "getActivePanel",
    value: function getActivePanel() {
      return this.activePanel;
    }
  }, {
    key: "getHash",
    value: function getHash() {
      return this.hash;
    }
  }, {
    key: "setModal",
    value: function setModal() {
      var history = this.historyPanels[this.activeView];

      if (history.length > 0 && history[history.length - 1].id === "route_modal") {
        return;
      }

      window.history.pushState({
        route: "route_modal"
      }, "route_modal");
      this.historyPanels[this.activeView].push({
        id: "route_modal"
      });
    }
  }, {
    key: "setActiveView",
    value: function setActiveView(id) {
      var panel = this.views[id].panel;
      this.activeView = id;
      this.activePanel = panel.id;
      this.historyViews.push(this.views[id]);
      var hash = (0, _getHashUrl["default"])(this.views[id].hash, panel.hash);
      window.history.pushState({
        route: id
      }, id);

      if (this.hash !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        this.hash = hash;
      }
    }
  }, {
    key: "setActivePanel",
    value: function setActivePanel(panel) {
      var index = this.views[this.activeView].panels.findIndex(function (item) {
        return item.id === panel;
      });
      this.views[this.activeView] = _objectSpread(_objectSpread({}, this.views[this.activeView]), {}, {
        panel: this.views[this.activeView].panels[index]
      });
      this.activePanel = panel;
      this.historyPanels[this.activeView].push(this.views[this.activeView].panel);
      var hash = (0, _getHashUrl["default"])(this.views[this.activeView].hash, this.views[this.activeView].panel.hash);
      window.history.pushState({
        route: panel
      }, panel);

      if (this.hash !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        this.hash = hash;
      }
    }
  }, {
    key: "back",
    value: function back() {
      if (this.historyViews.length === 0) {
        return;
      }

      if (this.historyPanels[this.activeView].length > 1) {
        var lastPanel = this.historyPanels[this.activeView].pop();

        if (lastPanel.id === "route_modal") {
          return;
        }

        this.activePanel = this.historyPanels[this.activeView][this.historyPanels[this.activeView].length - 1].id;
        this.views[this.activeView].panel = this.historyPanels[this.activeView][this.historyPanels[this.activeView].length - 1];
      } else if (this.historyViews.length > 1) {
        this.historyViews.pop();
        this.activeView = this.historyViews[this.historyViews.length - 1].id;
        this.activePanel = this.views[this.activeView].panel.id;
      }

      var hash = (0, _getHashUrl["default"])(this.views[this.activeView].hash, this.views[this.activeView].panel.hash);

      if (this.hash !== hash) {
        _vkBridge["default"].send("VKWebAppSetLocation", {
          location: hash
        });

        this.hash = hash;
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
            this.activeView = structure[i].id;
            this.activePanel = structure[i].panels[k].id;
            this.views[this.activeView].panel = structure[i].panels[k];
            this.hash = h; // не первая панель, добавляем в историю для возврата

            if (k > 0) {
              this.historyPanels[this.activeView].push(structure[i].panels[k]);
              window.history.pushState({
                route: this.activePanel
              }, this.activePanel);
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

      for (var key in this.historyPanels) {
        counter += this.historyPanels[key].length - 1;
        this.historyPanels[key] = this.historyPanels[key].slice(0, 1);
      }

      this.views[this.activeView].panel = this.historyPanels[this.activeView][this.historyPanels[this.activeView].length - 1]; // история views

      this.historyViews = [this.views[this.activeView]];
      window.history.go(-counter);
    }
  }]);
  return Router;
}();

var _default = Router;
exports["default"] = _default;