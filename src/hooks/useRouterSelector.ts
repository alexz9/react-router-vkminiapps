import { useMemo } from "react";
import store from "../store";

export const useRouterSelector = () => {
  const state = useMemo(() => store.getState(), [store.getState()]);
  return state;
}