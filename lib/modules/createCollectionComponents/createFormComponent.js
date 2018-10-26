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
import { withRouteParam } from "meteor/vulcan:more-helpers";
/**
 * Create the new/edit component
 */
const createFormComponent = (collection, options) => {
  const componentName = getFormComponentName(collection);
  const component = class ItemComponent extends PureComponent {
    render() {
      const { documentId, ...otherProps } = this.props;
      const { form } = options;
      const { basePath, editFields, newFields, ...otherFormOptions } = form;
      return (
        <Components.CollectionItemForm
          collection={collection}
          mutationFragment={getFragmentName(collection)}
          queryFragment={getFragmentName(collection)}
          basePath={getBasePath(collection, basePath)}
          documentId={documentId}
          fields={documentId ? editFields : newFields}
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
    hocs: [
      withCurrentUser,
      [withAccess, withAccessOptions],
      withRouteParam("documentId")
    ]
  });
  return component;
};
export default createFormComponent;
