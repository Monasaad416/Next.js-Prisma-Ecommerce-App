export interface ICategorySearchParams {
  [key: string]: string | string[] | undefined;
}

export type CategorySearchParams =
  | Promise<ICategorySearchParams>
  | ICategorySearchParams
  | undefined;
