import React, { PureComponent } from "react";
import { registerComponent, Components, withAccess } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import {
  getBasePath,
  getListComponentName,
  getNewPath,
  getEditPath,
  getDetailsPath
} from "../namingHelpers";

const createListComponent = (collection, options) => {
  const component = class ListComponent extends PureComponent {
    render() {
      const { results = [], loading, ...otherProps } = this.props;
      const { list } = options;
      const { limit, ...otherListOptions } = list;
      return (
        <Components.CollectionList
          collection={collection}
          options={{limit: limit}}
          //loading={loading}
          results={results}
          basePath={getBasePath(collection, options.basePath)}
          detailsPath={getDetailsPath(collection, options.basePath)}
          newPath={getNewPath(collection, options.basePath)}
          editPath={getEditPath(collection, options.basePath)}
          check={Users.isAdmin}
          {...otherListOptions}
          {...otherProps}
        />
      );
    }
  };

  //const withListOptions = {
  //  collection: collection,
  //  fragmentName: getFragmentName(collection),
  //  limit: 6
  //};
  //console.log("LIST", options.list.accessGroups);
  const withAccessOptions = {
    groups: options.list.accessGroups,
    redirect: options.list.accessRedirect
  };

  const componentName = getListComponentName(collection);
  component.displayName = componentName;
  registerComponent({
    name: componentName,
    component: component,
    hocs: [[withAccess, withAccessOptions]] //, [withList, withListOptions]]
  });
  return component;
};
export default createListComponent;
