declare type Dispatch = any;
interface ActionCreator<A, P extends any[] = any[]> {
    (...args: P): A;
}
interface ActionCreatorsMapObject<A = any, P extends any[] = any[]> {
    [key: string]: ActionCreator<A, P>;
}
export default function bindActionCreators<A, C extends ActionCreator<A>>(actionCreator: C, dispatch: Dispatch): C;
export default function bindActionCreators<A extends ActionCreator<any>, B extends ActionCreator<any>>(actionCreator: A, dispatch: Dispatch): B;
export default function bindActionCreators<A, M extends ActionCreatorsMapObject<A>>(actionCreators: M, dispatch: Dispatch): M;
export default function bindActionCreators<M extends ActionCreatorsMapObject, N extends ActionCreatorsMapObject>(actionCreators: M, dispatch: Dispatch): N;
export {};
