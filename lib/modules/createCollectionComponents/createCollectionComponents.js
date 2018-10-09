import createListComponent from "./createListComponent";
import createDetailsComponent from "./createDetailsComponent";
import createFormComponent from "./createFormComponent";
import { mergeDefaultCollectionOptions } from "../options";

const createCollectionComponents = (collection, options) => {
  const mergedOptions = mergeDefaultCollectionOptions(options);
  // register list page
  const ListComponent = createListComponent(collection, mergedOptions);
  // register detail page
  const DetailsComponent = createDetailsComponent(collection, mergedOptions);
  // register new/edit form page
  const FormComponent = createFormComponent(collection, mergedOptions);
  return { ListComponent, DetailsComponent, FormComponent };
};
export default createCollectionComponents;
