import React, { ReactNode, useEffect } from 'react';
import { Provider } from "react-redux";
import { routerInit, toBack } from '../store/actions';
import Router from '../utils/router';
import store from '../store';
import { IStructure } from '../types/app';

export const RouterContext = React.createContext<any | null>(null);

interface AppProps {
  structure: IStructure,
  children: ReactNode
}

const App: React.FC<AppProps> = ({ structure, children }) => {
  try {
    const router = new Router(structure);
    const hash = window.location.hash.slice(1);
    router.toHash(hash)
    store.dispatch(routerInit(router));
  } catch (error) {
    throw new Error("Incorrect structure! Check your application structure.");
  }
  useEffect(() => {
    window.addEventListener('popstate', () => store.dispatch(toBack()));
  }, []);
  return (
    <Provider store={store} context={RouterContext}>
      {children}
    </Provider>
  );
}

export default App;