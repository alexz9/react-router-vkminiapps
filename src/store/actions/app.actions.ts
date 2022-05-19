import { EActionTypes, IrouterInit, ItoHash, ItoModal, ItoPanel, ItoPopout, ItoView, IActions } from "../../types/store";

export const toPopout = function (payload: ItoPopout["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_TO_POPOUT,
    payload
  }
}

export const toView = function (payload: ItoView["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_TO_VIEW,
    payload
  }
}

export const toPanel = function (payload: ItoPanel["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_TO_PANEL,
    payload
  }
}

export const toModal = function (payload: ItoModal["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_TO_MODAL,
    payload
  }
}

export const toBack = function (): IActions {
  return {
    type: EActionTypes.ROUTER_TO_BACK
  }
}

export const toHash = function (payload: ItoHash["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_TO_HASH,
    payload
  }
}

export const routerInit = function (payload: IrouterInit["payload"]): IActions {
  return {
    type: EActionTypes.ROUTER_INIT,
    payload
  }
};

export const resetHistory = function (): IActions {
  return {
    type: EActionTypes.ROUTER_RESET_HISTORY   
  }
};
