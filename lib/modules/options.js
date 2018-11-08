import _merge from "lodash/merge";
const defaultCollectionOptions = {
  list: { accessGroups: ["admins"], accessRedirect: "/", paginate: false },
  details: { accessGroups: ["admins"], accessRedirect: "/" },
  form: { accessGroups: ["admins"], accessRedirect: "/" },
  menuItem: {
    groups: ["admins"]
  }
};

const defaultBackofficeOptions = {
  generateRoutes: true,
  generateMenuItems: true,
  generateComponents: true,
  generateUI: false,
  basePath: "/admin", // independent of the collection
  ...defaultCollectionOptions
};

export const mergeDefaultCollectionOptions = (
  collectionOptions,
  options = {}
) => _merge({}, defaultBackofficeOptions, options, collectionOptions);
export const mergeDefaultBackofficeOptions = options =>
  _merge({}, defaultBackofficeOptions, options);
