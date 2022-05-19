import { IRouter } from "../utils/router";
import { IPanel, IView } from "./app";
export interface IAppState {
    popout: any;
    modal: any;
    activeView: string;
    activePanel: string;
    hash: string;
}
export declare enum EActionTypes {
    ROUTER_TO_POPOUT = "ROUTER/TO_POPOUT",
    ROUTER_TO_MODAL = "ROUTER/TO_MODAL",
    ROUTER_TO_VIEW = "ROUTER/TO_VIEW",
    ROUTER_TO_PANEL = "ROUTER/TO_PANEL",
    ROUTER_TO_BACK = "ROUTER/TO_BACK",
    ROUTER_TO_HASH = "ROUTER/TO_HASH",
    ROUTER_INIT = "ROUTER/INIT",
    ROUTER_RESET_HISTORY = "ROUTER/RESET_HISTORY"
}
export interface ItoPopout {
    type: EActionTypes.ROUTER_TO_POPOUT;
    payload: any;
}
export interface ItoModal {
    type: EActionTypes.ROUTER_TO_MODAL;
    payload: any;
}
export interface ItoView {
    type: EActionTypes.ROUTER_TO_VIEW;
    payload: IView["id"];
}
export interface ItoPanel {
    type: EActionTypes.ROUTER_TO_PANEL;
    payload: IPanel["id"];
}
export interface ItoBack {
    type: EActionTypes.ROUTER_TO_BACK;
}
export interface ItoHash {
    type: EActionTypes.ROUTER_TO_HASH;
    payload: string;
}
export interface IrouterInit {
    type: EActionTypes.ROUTER_INIT;
    payload: IRouter;
}
export interface IresetHistory {
    type: EActionTypes.ROUTER_RESET_HISTORY;
}
export declare type IActions = ItoPopout | ItoModal | ItoView | ItoPanel | ItoBack | ItoHash | IrouterInit | IresetHistory;
