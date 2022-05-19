import React, { ReactNode } from "react";
import { IStructure } from "../types/app";
interface RouterProps {
    structure: IStructure;
    children: ReactNode;
}
export declare const RouterProvider: React.FC<RouterProps>;
export default RouterProvider;
