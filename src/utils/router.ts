import bridge from '@vkontakte/vk-bridge';
import { IPanel, IStructure, IView } from '../types/app';
import getHashUrl from './getHashUrl';

export interface IRouter {
  structure: IStructure
  hash: string
  activeView: IView['id']
  activePanel: IPanel['id']
  views: any
  historyPanels: any
  historyViews: any[]
  getActiveView(): IView['id']
  getActivePanel(): IPanel['id']
  getHash(): string
  setModal(): void
  setActiveView(id: IView['id']): void
  setActivePanel(id: IPanel['id']): void
  back(): void
  toHash(hash: string): void
  resetHistory():void
}

class Router implements IRouter {
  readonly structure: IRouter['structure']
  hash: IRouter['hash']
  activeView: IRouter['activeView']
  activePanel: IRouter['activePanel']
  views: IRouter['views']
  historyPanels: IRouter['historyPanels']
  historyViews: IRouter['historyViews']

  constructor(structure: IRouter['structure']) {
    this.structure = structure;
    this.hash = "";
    this.activeView = structure[0].id;
    this.activePanel = structure[0].panels[0].id;

    // объект views для быстрого доступа по id с одной активной панелью
    this.views = structure.reduce((accum: any, item) => {
      accum[item.id] = { ...item, panel: item.panels[0] };
      return accum;
    }, {});

    // история панелей, добавляем первую для каждого views
    this.historyPanels = structure.reduce((accum: any, item) => {
      accum[item.id] = [item.panels[0]];
      return accum;
    }, {});

    // история views, добавляем первую
    this.historyViews = [this.views[this.activeView]];
  }
  getActiveView() {
    return this.activeView;
  }
  getActivePanel() {
    return this.activePanel;
  }
  getHash() {
    return this.hash;
  }
  setModal() {
    const history = this.historyPanels[this.activeView];
    if (history.length > 0 && history[history.length - 1].id === "route_modal") {
      return;
    }
    window.history.pushState({ route: "route_modal" }, "route_modal");
    this.historyPanels[this.activeView].push({ id: "route_modal" });
  }
  setActiveView(id: IView['id']) {
    const panel = this.views[id].panel;

    this.activeView = id;
    this.activePanel = panel.id;
    this.historyViews.push(this.views[id]);

    const hash = getHashUrl(this.views[id].hash, panel.hash);

    window.history.pushState({ route: id }, id);

    if (this.hash !== hash) {
      bridge.send("VKWebAppSetLocation", { location: hash });
      this.hash = hash;
    }
  }
  setActivePanel(panel: IPanel['id']) {
    const index = this.views[this.activeView].panels.findIndex((item: any) => item.id === panel);
    this.views[this.activeView] = { ...this.views[this.activeView], panel: this.views[this.activeView].panels[index] };

    this.activePanel = panel;
    this.historyPanels[this.activeView].push(this.views[this.activeView].panel);

    const hash = getHashUrl(this.views[this.activeView].hash, this.views[this.activeView].panel.hash);

    window.history.pushState({ route: panel }, panel);

    if (this.hash !== hash) {
      bridge.send("VKWebAppSetLocation", { location: hash });
      this.hash = hash;
    }
  }
  back() {
    if (this.historyViews.length === 0) {
      return;
    }

    if (this.historyPanels[this.activeView].length > 1) {
      const lastPanel = this.historyPanels[this.activeView].pop();
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

    const hash = getHashUrl(this.views[this.activeView].hash, this.views[this.activeView].panel.hash);

    if (this.hash !== hash) {
      bridge.send("VKWebAppSetLocation", { location: hash });
      this.hash = hash;
    }
  }
  toHash(hash: IRouter['hash']) {
    const { structure } = this;
    if(!hash.trim()){
      return;
    }   
    loop: for (let i = 0; i < structure.length; i++) {
      for (let k = 0; k < structure[i].panels.length; k++) {
        const h = getHashUrl(structure[i].hash, structure[i].panels[k].hash);
        // хеш подходит под заданную структуру, меняем состояние активных вивок и панелей
        if (h === hash) {
          this.activeView = structure[i].id;
          this.activePanel = structure[i].panels[k].id;
          this.views[this.activeView].panel = structure[i].panels[k];
          this.hash = h;
          // не первая панель, добавляем в историю для возврата
          if (k > 0) {
            this.historyPanels[this.activeView].push(structure[i].panels[k]);
            window.history.pushState({ route: this.activePanel }, this.activePanel);
          }          
          break loop;
        }
      }
    }
  }
  resetHistory(){
    // история панелей
    let counter = 0;
    for(let key in this.historyPanels){
      counter += this.historyPanels[key].length - 1;
      this.historyPanels[key] = this.historyPanels[key].slice(0, 1);
    }
    this.views[this.activeView].panel = this.historyPanels[this.activeView][this.historyPanels[this.activeView].length - 1];
    // история views
    this.historyViews = [this.views[this.activeView]];
    window.history.go(-counter);
  }
}

export default Router;