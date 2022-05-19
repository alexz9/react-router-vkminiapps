import React, { useContext, useMemo } from "react";
import AppContext from "../store";
import actions from "../store/actions";
import bindActionCreators from "../utils/bindActionCreators";

function withRouter<T>(Component: React.ComponentType<T>) {  
  return (props: any) => {
    const { state, dispatch } = useContext(AppContext);
    const bindActions = useMemo(() => bindActionCreators(actions, dispatch), []);
    return <Component {...props} router={{ ...state, ...bindActions }} />
  } 
}

export default withRouter;