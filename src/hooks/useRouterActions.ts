import { bindActionCreators } from "redux";
import store from "../store";
import actions from "../store/actions";

export const useRouterActions = () => {
  const dispatch = store.dispatch;
  return bindActionCreators(actions, dispatch);
}