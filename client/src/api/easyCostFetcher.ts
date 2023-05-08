import { Logout } from "../authContext/components/AuthContext";

export type EasyCostFetcherExtraProps = {
  /**
   * You can add some extra props to your generated fetchers.
   *
   * Note: You need to re-gen after adding the first property to
   * have the `EasyCostFetcherExtraProps` injected in `EasyCostComponents.ts`
   **/
};

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; // TODO add your baseUrl

export type ErrorWrapper<TError> =
  | TError
  | { status: "unknown"; payload: string };

export type EasyCostFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> =
  {
    url: string;
    method: string;
    body?: TBody;
    headers?: THeaders;
    queryParams?: TQueryParams;
    pathParams?: TPathParams;
    signal?: AbortSignal;
  } & EasyCostFetcherExtraProps;

export async function easyCostFetch<
  TData,
  TError,
  TBody extends {} | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {}
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
  signal,
}: EasyCostFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    const response = await window.fetch(
      `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      {
        signal,
        method: method.toUpperCase(),
        body: body ? JSON.stringify(body) : undefined,

        headers: {
          //  authorization: "",
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    if (response.status === 401) {
      Logout();
    }
    if (!response.ok) {
      let error: ErrorWrapper<TError>;
      try {
        error = await response.json();
      } catch (e) {
        error = {
          status: "unknown" as const,
          payload:
            e instanceof Error
              ? `Unexpected error (${e.message})`
              : "Unexpected error",
        };
      }
    }

    if (response.headers.get("content-type")?.includes("json")) {
      return await response.json();
    } else {
      // if it is not a json response, assume it is a blob and cast it to TData
      return (await response.blob()) as unknown as TData;
    }
  } catch (e) {
    throw {
      status: "unknown" as const,
      payload:
        e instanceof Error ? `Network error (${e.message})` : "Network error",
    };
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};
