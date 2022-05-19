import React, { useContext, useMemo } from "react";
import { bindActionCreators, Dispatch } from "redux";
import AppContext from "../store";
import actions from "../store/actions";

function withRouter<T>(Component: React.ComponentType<T>) {
  const { state, dispatch } = useContext(AppContext);
  const bindActions = useMemo(() => bindActionCreators(actions, dispatch as Dispatch), []);
  const Connection = (props: any) => {
    return <Component {...props} router={{ ...state, ...bindActions }} />
  }
  return Connection;
}

export default withRouter;