import { IrouterInit, ItoHash, ItoModal, ItoPanel, ItoPopout, ItoView, IActions } from "../../types/store";
export declare const toPopout: (payload: ItoPopout["payload"]) => IActions;
export declare const toView: (payload: ItoView["payload"]) => IActions;
export declare const toPanel: (payload: ItoPanel["payload"]) => IActions;
export declare const toModal: (payload: ItoModal["payload"]) => IActions;
export declare const toBack: () => IActions;
export declare const toHash: (payload: ItoHash["payload"]) => IActions;
export declare const routerInit: (payload: IrouterInit["payload"]) => IActions;
export declare const resetHistory: () => IActions;
