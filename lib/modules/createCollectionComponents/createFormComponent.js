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
      const { form } = options;
      const { basePath, editFields, newFields, ...otherFormOptions } = form;
      return (
        <Components.CollectionItemForm
          collection={collection}
          mutationFragment={getFragmentName(collection)}
          queryFragment={getFragmentName(collection)}
          basePath={getBasePath(collection, basePath)}
          documentId={finalDocumentId}
          params={params}
          fields={finalDocumentId ? editFields : newFields}
          {...otherFormOptions}
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
  // Unwrapped counter part in case we want to reuse the component
  registerComponent({
    name: componentName + "Inner",
    component: component
  });
  registerComponent({
    name: componentName,
    component: component,
    hocs: [withCurrentUser, [withAccess, withAccessOptions], withDocumentId()]
  });
  return component;
};
export default createFormComponent;
