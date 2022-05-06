import { IPanel, IStructure, IView } from "../types/app";
declare class Router {
    #private;
    readonly structure: IStructure;
    constructor(structure: IStructure);
    setModal(): void;
    setActiveView(id: IView["id"]): void;
    setActivePanel(panel: IPanel["id"]): void;
    back(): void;
    toHash(hash: string): void;
    resetHistory(): void;
    get activeView(): string;
    get activePanel(): string;
    get hash(): string;
}
export interface IRouter extends Router {
}
export default Router;
