import { ISearchParams } from "../../interfaces/SearchParamsProps";

export default function getSearchQuery(params: ISearchParams): string {
  const queryParam = params.query;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  return query?.trim() ?? "";
}