import { useContext, useMemo } from "react";
import { bindActionCreators, Dispatch } from "redux";
import AppContext from "../store";
import actions from "../store/actions";

export const useRouterActions = () => {
  const { dispatch } = useContext(AppContext);
  return useMemo(() => bindActionCreators(actions, dispatch as Dispatch), []);
}