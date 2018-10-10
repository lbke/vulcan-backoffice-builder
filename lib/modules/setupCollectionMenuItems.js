/** Add an item to the menu to access the collection */
import {
  registerMenuItem,
  getMenuItems,
  getAuthorizedMenuItems
} from "meteor/vulcan:menu";
import {
  getBasePath,
  getCollectionName,
  getCollectionDisplayName
} from "./namingHelpers";
import { mergeDefaultCollectionOptions } from "./options";

const adminMenuName = "vulcan-backoffice-builder";

export const setupCollectionMenuItems = (collection, providedOptions) => {
  const options = mergeDefaultCollectionOptions(providedOptions);
  const label = options.menuItem.name || getCollectionDisplayName(collection);
  const collectionName = getCollectionName(collection);
  registerMenuItem(
    collectionName,
    {
      label,
      path:
        options.menuItem.basePath || getBasePath(collection, options.basePath),
      groups: options.menuItem.groups
    },
    adminMenuName
  );
};
// to retrieve the items
export const getBackofficeMenuItems = () => getMenuItems(adminMenuName);
export const getAuthorizedBackofficeMenuItems = currentUser =>
  getAuthorizedMenuItems(currentUser, adminMenuName);

export default setupCollectionMenuItems;
