import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toPopout, toModal, toView, toPanel, toBack, toHash } from '../reducer';
import { RouterContext } from '../App';

function withRouter(Component) {
  const Connection = (props) => {
    return <Component {...props} />
  }   
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, { context: RouterContext })(Connection);
}

function mapStateToProps(state) {
  return { ...state };
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ toPopout, toModal, toView, toPanel, toBack, toHash }, dispatch)
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    router: { ...stateProps, ...dispatchProps },
    ...ownProps
  }
}

export default withRouter;