import React from 'react';
import { connect } from 'react-redux';
import { toBack } from './reducer';


class Structure extends React.Component {
  componentDidMount() {
    const { dispatch} = this.props;   
    window.addEventListener('popstate', (e) => dispatch(toBack()));
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default connect()(Structure);