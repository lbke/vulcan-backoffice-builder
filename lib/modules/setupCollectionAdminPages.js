import merge from "lodash/merge";
import setupCollectionAdminRoutes from "./setupCollectionRoutes";
import {
  createListComponent,
  createDetailsComponent,
  createFormComponent,
  defaultOptions
} from "./createCollectionComponents"


const setupCollectionAdminPages = (collection, options) => {
  const mergedOptions = merge({}, defaultOptions, options);
  // register list page
  const ListComponent = createListComponent(collection, mergedOptions);
  // register detail page
  const DetailsComponent = createDetailsComponent(collection, mergedOptions);
  // register new/edit form page
  const FormComponent = createFormComponent(collection, mergedOptions);
  // setup the routes
  setupCollectionAdminRoutes(collection, mergedOptions);
  return { ListComponent, DetailsComponent, FormComponent };
};
export default setupCollectionAdminPages;
