/**
 * Utility to parse searchParams (which can be a Promise in Next.js 15 or a plain object)
 * and generate a serialized query string and key-value query object.
 */
export const parseSearchParams = async (
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>,
) => {
  // Resolves both Promise and non-Promise values automatically
  const queryParamsObjects = await Promise.resolve(searchParams);

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key];
      if (value === undefined || value === null) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  return {
    queryString,
    queryObject: queryParamsObjects,
  };
};
