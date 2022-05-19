import { createContext, Dispatch } from "react";
import { IActions } from "../types/store";
import { RootState } from "./reducers";
import { initialState } from "./reducers/app.reducer";

const AppContext = createContext<{
  state: RootState;
  dispatch: Dispatch<IActions>
}>({
  state: initialState,
  dispatch: () => null
});

export default AppContext;