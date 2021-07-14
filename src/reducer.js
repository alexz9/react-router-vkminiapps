function createAction(type) {
  return function (payload) {
    return { type, payload };
  }
}

const ROUTER_TO_POPOUT = 'ROUTER/TO_POPOUT';
const ROUTER_TO_MODAL = 'ROUTER/TO_MODAL';
const ROUTER_TO_VIEW = 'ROUTER/TO_VIEW';
const ROUTER_TO_PANEL = 'ROUTER/TO_PANEL';
const ROUTER_TO_BACK = 'ROUTER/TO_BACK';
const ROUTER_TO_HASH = 'ROUTER/TO_HASH';
const ROUTER_INIT = 'ROUTER/INIT';

export const toPopout = createAction(ROUTER_TO_POPOUT);
export const toModal = createAction(ROUTER_TO_MODAL);
export const toView = createAction(ROUTER_TO_VIEW);
export const toPanel = createAction(ROUTER_TO_PANEL);
export const toBack = createAction(ROUTER_TO_BACK);
export const toHash = createAction(ROUTER_TO_HASH);
export const routerInit = createAction(ROUTER_INIT);

const initialState = {
  popout: null,
  modal: null,
  activeView: "",
  activePanel: "",
  hash: ""
};

let router = {};

export default function app(state = initialState, action) {  
  switch (action.type) {
    case ROUTER_TO_POPOUT:
      router.setModal();
      return { ...state, popout: action.payload };
    case ROUTER_TO_MODAL:
      router.setModal();
      return { ...state, modal: action.payload };
    case ROUTER_TO_VIEW:
      router.setActiveView(action.payload);
      return { ...state, activeView: action.payload, activePanel: router.getActivePanel(), hash: router.getHash() };
    case ROUTER_TO_PANEL:
      router.setActivePanel(action.payload);
      return { ...state, activePanel: action.payload, hash: router.getHash() };
    case ROUTER_TO_BACK:
      router.back();
      return {
        ...state,
        activeView: router.getActiveView(),
        activePanel: router.getActivePanel(),
        hash: router.getHash(),
        modal: null,
        popout: null
      };
    case ROUTER_TO_HASH:      
      router.toHash(action.payload);
      return { ...state, hash: action.payload, activeView: router.getActiveView(), activePanel: router.getActivePanel() };
    case ROUTER_INIT:
      router = action.payload;
      return { ...state, activeView: router.getActiveView(), activePanel: router.getActivePanel() };    
    default:      
      return state;
  }
}
