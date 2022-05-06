import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers/app.reducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;