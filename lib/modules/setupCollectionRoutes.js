import { addRoute } from "meteor/vulcan:core";
import {
  getBasePath,
  getBaseRouteName,
  getNewPath,
  getEditPath,
  getDetailsPath,
  getFormComponentName,
  getListComponentName,
  getDetailsComponentName
} from "./namingHelpers";
import { mergeDefaultCollectionOptions } from "./options";
import _values from "lodash/values";

export const generateRoutes = (collection, options) => {
  const basePath = getBasePath(collection, options.basePath);
  const editPath = getEditPath(collection, options.basePath);
  const newPath = getNewPath(collection, options.basePath);
  const detailsPath = getDetailsPath(collection, options.basePath);
  const baseRouteName = getBaseRouteName(collection);
  const routes = {
    baseRoute: {
      name: baseRouteName,
      path: basePath,
      componentName: getListComponentName(collection),
      returnRoute: basePath
    },
    newRoute: {
      name: "new-" + baseRouteName,
      path: newPath,
      componentName: getFormComponentName(collection),
      returnRoute: basePath
    },
    editRoute: {
      name: "edit-" + baseRouteName,
      path: editPath,
      componentName: getFormComponentName(collection),
      returnRoute: basePath
    },
    detailsRoute: {
      name: baseRouteName + "-details",
      path: detailsPath,
      componentName: getDetailsComponentName(collection),
      returnRoute: basePath
    }
  };
  return routes;
};
export default (collection, providedOptions = {}) => {
  const options = mergeDefaultCollectionOptions(providedOptions);
  const routes = generateRoutes(collection, options);
  _values(routes).forEach(route => {
    addRoute(route);
  });
  return routes;
};
