export interface IRequestPayload<TBody = {}, TQuery = {}, TParams = {}> {
  body?: TBody;
  queryParams?: TQuery;
  urlParams?: TParams;
}
