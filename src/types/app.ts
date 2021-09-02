export interface IPanel{
  id: string,
  hash?: string
}

export interface IView{
  id: string,
  hash?: string,
  panels: IPanel[]
}

export type IStructure = IView[];