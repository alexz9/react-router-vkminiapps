export declare const useRouterActions: () => {
    toPopout: (payload: any) => import("../types/store").IActions;
    toView: (payload: string) => import("../types/store").IActions;
    toPanel: (payload: string) => import("../types/store").IActions;
    toModal: (payload: any) => import("../types/store").IActions;
    toBack: () => import("../types/store").IActions;
    toHash: (payload: string) => import("../types/store").IActions;
    routerInit: (payload: import("../utils/router").IRouter) => import("../types/store").IActions;
    resetHistory: () => import("../types/store").IActions;
};
