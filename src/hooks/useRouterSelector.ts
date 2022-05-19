import { useContext } from "react";
import AppContext from "../store";

export const useRouterSelector = () => {
  const { state } = useContext(AppContext);
  return state;
};