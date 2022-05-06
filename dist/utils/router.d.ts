import { IPanel, IStructure, IView } from '../types/app';
export interface IRouter {
    structure: IStructure;
    hash: string;
    activeView: IView['id'];
    activePanel: IPanel['id'];
    views: any;
    historyPanels: any;
    historyViews: any[];
    getActiveView(): IView['id'];
    getActivePanel(): IPanel['id'];
    getHash(): string;
    setModal(): void;
    setActiveView(id: IView['id']): void;
    setActivePanel(id: IPanel['id']): void;
    back(): void;
    toHash(hash: string): void;
    resetHistory(): void;
}
declare class Router implements IRouter {
    readonly structure: IRouter['structure'];
    hash: IRouter['hash'];
    activeView: IRouter['activeView'];
    activePanel: IRouter['activePanel'];
    views: IRouter['views'];
    historyPanels: IRouter['historyPanels'];
    historyViews: IRouter['historyViews'];
    constructor(structure: IRouter['structure']);
    getActiveView(): string;
    getActivePanel(): string;
    getHash(): string;
    setModal(): void;
    setActiveView(id: IView['id']): void;
    setActivePanel(panel: IPanel['id']): void;
    back(): void;
    toHash(hash: IRouter['hash']): void;
    resetHistory(): void;
}
export default Router;
