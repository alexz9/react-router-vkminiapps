import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import store from "../store";
import actions from "../store/actions";

export const useRouterActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
}