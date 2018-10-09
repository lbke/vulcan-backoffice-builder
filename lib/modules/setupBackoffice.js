/** Setup a full fledged backoffice
 * - create components
 * - create routes
 * - register menu items
 */
import { mergeDefaultBackofficeOptions } from "./options";
import { getCollectionName } from "./namingHelpers";
import createCollectionComponents from "./createCollectionComponents";
import setupCollectionRoutes from "./setupCollectionRoutes";
import setupCollectionMenuItems from "./setupCollectionMenuItems";

const setupBackoffice = (collections, providedOptions = {}) => {
  const options = mergeDefaultBackofficeOptions(providedOptions);
  let result = {};
  collections.forEach(collection => {
    const collectionName = getCollectionName(collection);
    const collectionOptions = options[collectionName];
    if (options.generateComponents) {
      createCollectionComponents(collection, collectionOptions);
    }
    if (options.generateRoutes) {
      setupCollectionRoutes(collection, collectionOptions);
    }
    if (options.generateMenuItems) {
      setupCollectionMenuItems(collection, collectionOptions);
    }
  });
  if (options.generateUI) {
    // TODO: create the backoffice UI on basePath endpoint
    // createBackofficeComponents() // init the components
    // addRoute({name:'vulcan-backoffice', path: options.basePath, componentName:"VulcanBackoffice"}) // setup the route
  }
};

export default setupBackoffice;
