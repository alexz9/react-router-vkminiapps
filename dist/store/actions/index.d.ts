declare const actions: {
    toPopout: (payload: any) => import("../../types/store").TActions;
    toView: (payload: string) => import("../../types/store").TActions;
    toPanel: (payload: string) => import("../../types/store").TActions;
    toModal: (payload: any) => import("../../types/store").TActions;
    toBack: () => import("../../types/store").TActions;
    toHash: (payload: string) => import("../../types/store").TActions;
    routerInit: (payload: import("../../utils/router").IRouter) => import("../../types/store").TActions;
    resetHistory: () => import("../../types/store").TActions;
};
export default actions;
