import React, { ReactNode, useEffect, useReducer } from "react";
import { routerInit, toBack } from "../store/actions/app.actions";
import Router from "../utils/router";
import { IStructure } from "../types/app";
import AppContext from "../store";
import reducer from "../store/reducers";
import { initialState } from "../store/reducers/app.reducer";

interface RouterProps {
  structure: IStructure
  children: ReactNode
}

const RouterProvider: React.FC<RouterProps> = ({ structure, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const router = new Router(structure);
      const hash = window.location.hash.slice(1);
      router.toHash(hash)
      dispatch(routerInit(router));
    } catch (error) {
      throw new Error("Incorrect structure! Check your application structure.");
    }
    const back = () => dispatch(toBack());
    window.addEventListener("popstate", back);
    return () => window.removeEventListener("popstate", back);
  }, []);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default RouterProvider;