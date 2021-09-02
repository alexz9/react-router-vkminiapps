import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toPopout, toModal, toView, toPanel, toBack, toHash } from '../store/actions';
import { RouterContext } from '../components/App';
import { IAppState } from '../types/store';

function withRouter<T>(Component: T) {
  const Connection = (props: {}) => {
    // @ts-ignore
    return <Component {...props} />
  }
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, { context: RouterContext })(Connection);
}

function mapStateToProps(state: IAppState) {
  return { ...state };
}
function mapDispatchToProps(dispatch: any) {
  return {
    ...bindActionCreators({ toPopout, toModal, toView, toPanel, toBack, toHash }, dispatch)
  };
}
function mergeProps(stateProps: IAppState, dispatchProps: any, ownProps: any) {
  return {
    router: { ...stateProps, ...dispatchProps },
    ...ownProps
  }
}

export default withRouter;