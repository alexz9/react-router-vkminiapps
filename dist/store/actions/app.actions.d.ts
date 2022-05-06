import { IrouterInit, ItoHash, ItoModal, ItoPanel, ItoPopout, ItoView, TActions } from "../../types/store";
export declare const toPopout: (payload: ItoPopout["payload"]) => TActions;
export declare const toView: (payload: ItoView["payload"]) => TActions;
export declare const toPanel: (payload: ItoPanel["payload"]) => TActions;
export declare const toModal: (payload: ItoModal["payload"]) => TActions;
export declare const toBack: () => TActions;
export declare const toHash: (payload: ItoHash["payload"]) => TActions;
export declare const routerInit: (payload: IrouterInit["payload"]) => TActions;
export declare const resetHistory: () => TActions;
