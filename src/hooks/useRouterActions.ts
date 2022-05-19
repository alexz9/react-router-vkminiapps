import { useContext, useMemo } from "react";
import AppContext from "../store";
import actions from "../store/actions";
import bindActionCreators from "../utils/bindActionCreators";

export const useRouterActions = () => {
  const { dispatch } = useContext(AppContext);
  return useMemo(() => bindActionCreators(actions, dispatch), []);
}