import React from 'react';
import { Provider } from "react-redux";
import { routerInit } from './reducer';
import Structure from './Structure';
import Router from './router';
import store from './store';

export const RouterContext = React.createContext();

const App = (props) => {  
  try {
    store.dispatch(routerInit(new Router(props.structure)));
  } catch (error) {
    throw new Error("Incorrect structure! Check your application structure.");
  }
  return (
    <Provider store={store} context={RouterContext}>
      <Structure value={props.structure} context={RouterContext}>
        {props.children}
      </Structure>
    </Provider>
  );
}

export default App;