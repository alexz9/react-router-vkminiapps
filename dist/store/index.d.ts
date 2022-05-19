import { Dispatch } from "react";
import { IActions } from "../types/store";
import { RootState } from "./reducers";
declare const AppContext: import("react").Context<{
    state: RootState;
    dispatch: Dispatch<IActions>;
}>;
export default AppContext;
