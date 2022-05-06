import React, { ReactNode } from "react";
import { IStructure } from "../types/app";
export declare const RouterContext: React.Context<any>;
interface RouterProps {
    structure: IStructure;
    children: ReactNode;
}
declare const App: React.FC<RouterProps>;
export default App;
