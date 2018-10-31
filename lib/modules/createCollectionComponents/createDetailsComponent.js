import React, { PureComponent } from "react";
import {
  registerComponent,
  Components,
  withSingle,
  withAccess
} from "meteor/vulcan:core";
import {
  getDetailsComponentName,
  getFormComponentName,
  getBasePath,
  getEditPath
} from "../namingHelpers";
import { withRouteParam } from "meteor/vulcan:more-helpers";
/**
 * Create the item details page
 */
const createDetailsComponent = (collection, options) => {
  const componentName = getDetailsComponentName(collection);
  const component = class DetailsComponent extends PureComponent {
    render() {
      const { loading, document, currentUser } = this.props;
      return (
        <Components.CollectionItemDetails
          collection={collection}
          basePath={getBasePath(collection, options.basePath)}
          editPath={getEditPath(collection, options.basePath)}
          FormComponentName={getFormComponentName(collection)}
          displayedSchemaFields={Object.keys(collection.options.schema).map(
            key => ({
              name: key,
              ...collection.options.schema[key]
            })
          )}
          loading={loading}
          document={document}
          headerText={options.details.headerText}
          fields={options.details.fields}
        />
      );
    }
  };
  component.displayName = componentName;
  const withDocumentOptions = {
    collection
  };
  const withAccessOptions = {
    groups: options.details.accessGroups,
    redirect: options.details.accessRedirect
  };
  registerComponent({
    name: componentName,
    component: component,
    hocs: [
      [withAccess, withAccessOptions],
      withRouteParam("documentId"),
      [withSingle, withDocumentOptions]
    ]
  });
  return component; // return if the component is needed
};
export default createDetailsComponent;
