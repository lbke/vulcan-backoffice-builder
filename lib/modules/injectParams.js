// @see https://github.com/pillarjs/path-to-regexp for the full syntax
// this does the exact opposite: generating the path from the path definition
// + the params as an object
export const injectParams = (urlDefinition, params) =>
  Object.keys(params)
    .reduce(
      (url, key) =>
        url
          .replace(new RegExp(`:${key}$`), params[key])
          .replace(new RegExp(`:${key}\/`), `${params[key]}/`)
          // optional params
          .replace(new RegExp(`:${key}\?`), params[key]),
      // remove unmatched optional params
      urlDefinition
    )
    .replace(new RegExp(`:$.+\?`), "");
export default injectParams;
