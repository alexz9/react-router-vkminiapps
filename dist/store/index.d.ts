<<<<<<< HEAD
declare const store: import("redux").Store<import("../types/store").IAppState, import("../types/store").IActions>;
export default store;
=======
import { Dispatch } from "react";
import { IActions } from "../types/store";
import { RootState } from "./reducers";
declare const AppContext: import("react").Context<{
    state: RootState;
    dispatch: Dispatch<IActions>;
}>;
export default AppContext;
>>>>>>> context
