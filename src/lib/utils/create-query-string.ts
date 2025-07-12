/**
 *
 * @param params - An object containing key-value pairs to be converted into a query string.
 * Each key represents a parameter name, and each value represents the parameter value.
 * @returns A string representing the query string. Not prefixed with '?'.
 */
export default function createQueryString(
  params: Record<string, string | number>
): string {
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v.toString().trim().length > 0)
          .map(([k, v]) => [k, String(v)])
      ).toString()
    : "";

  return queryString;
}
