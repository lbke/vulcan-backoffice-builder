import React, { PureComponent } from "react";
import {
  registerComponent,
  Components,
  withCurrentUser,
  withAccess
} from "meteor/vulcan:core";
import {
  getFormComponentName,
  getFragmentName,
  getBasePath
} from "../namingHelpers";
import { withDocumentId } from "../../hocs/withDocumentId";
/**
 * Create the new/edit component
 */
const createFormComponent = (collection, options) => {
  const componentName = getFormComponentName(collection);
  const component = class ItemComponent extends PureComponent {
    render() {
      const { documentId, params, ...otherProps } = this.props;
      const finalDocumentId = documentId || params.documentId;
      return (
        <Components.CollectionItemForm
          collection={collection}
          mutationFragment={getFragmentName(collection)}
          queryFragment={getFragmentName(collection)}
          basePath={getBasePath(collection, options.basePath)}
          documentId={finalDocumentId}
          params={params}
          fields={
            finalDocumentId ? options.form.editFields : options.form.newFields
          }
          {...otherProps}
        />
      );
    }
  };
  component.displayName = componentName;
  const withAccessOptions = {
    groups: options.form.accessGroups,
    redirect: options.form.accessRedirect
  };
  registerComponent({
    name: componentName,
    component: component,
    hocs: [withCurrentUser, [withAccess, withAccessOptions], withDocumentId()]
  });
  return component;
};
export default createFormComponent;
