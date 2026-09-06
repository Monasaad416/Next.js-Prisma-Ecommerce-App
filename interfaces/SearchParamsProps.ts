export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export type PageSearchParams =
  | Promise<ISearchParams>
  | ISearchParams
  | undefined;
