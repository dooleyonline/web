/**
 *
 * @param params - An object containing key-value pairs to be converted into a query string.
 * Each key represents a parameter name, and each value represents the parameter value.
 * @returns A string representing the query string. Not prefixed with '?'.
 */
export function createQueryString(params: Record<string, unknown>): string {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  return queryString ? `${queryString}` : "";
}
