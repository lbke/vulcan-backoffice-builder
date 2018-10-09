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

export default (collection, providedOptions = {}) => {
  const options = mergeDefaultCollectionOptions(providedOptions);

  const basePath = getBasePath(collection, options.basePath);
  const editPath = getEditPath(collection, basePath);
  const newPath = getNewPath(collection, basePath);
  const detailsPath = getDetailsPath(collection, basePath);
  const baseRouteName = getBaseRouteName(collection);
  const routes = [
    {
      name: baseRouteName,
      path: basePath,
      componentName: getListComponentName(collection),
      returnRoute: basePath
    },
    {
      name: "new-" + baseRouteName,
      path: newPath,
      componentName: getFormComponentName(collection),
      returnRoute: basePath
    },
    {
      name: "edit-" + baseRouteName,
      path: editPath,
      componentName: getFormComponentName(collection),
      returnRoute: basePath
    },
    {
      name: baseRouteName + "-details",
      path: detailsPath,
      componentName: getDetailsComponentName(collection),
      returnRoute: basePath
    }
  ];
  routes.forEach(route => {
    addRoute(route);
  });
};
