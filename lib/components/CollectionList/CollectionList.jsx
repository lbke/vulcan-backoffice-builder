/**
 * Generic page for a collection
 * Must be handled by the parent :
 * - providing the documents and callbacks
 */

import React from "react";
import {
  Components,
  Loading,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import Users from "meteor/vulcan:users";
import { Link } from "react-router-dom";
import PlusIcon from "mdi-material-ui/Plus";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import buildActionsColumn from "./buildActionColumn";
import buildDefaultColumns from "./buildDefaultColumns";

import withStyles from "@material-ui/core/styles/withStyles";

import { getNewPath } from "../../modules/namingHelpers";
import _difference from "lodash/difference";

const styles = theme => ({
  addButtonWrapper: {
    textAlign: "right"
  },
  headerWrapper: {
    padding: theme.spacing.unit * 4
  },
  datatableWrapper: {}
});

const getCollectionSchema = collection => collection.options.schema;
const getDefaultColumns = (collection, currentUser) => {
  const schema = getCollectionSchema(collection);
  const possibleColumnsMap = Users.getViewableFields(currentUser, collection);
  let validColumns = Object.keys(possibleColumnsMap);
  validColumns = validColumns
    // remove array fields
    .filter(colName => !colName.match(/\.\$$/));
  // remove unwanted columns
  validColumns = _difference(validColumns, ["_id", "userId"]);
  // remove columns that are not viewable
  //validColumns = Users.restrict

  return validColumns;
};
//<FormattedMessage id="collectionAdmin.collectionList.no_data" />

const setSortable = (sortableColumns, columns) => {
  const sortableMap = sortableColumns.reduce((res, col) => ({ ...res, [col]: true }), {})
  return  columns.map(item => (item.name in sortableMap ? {...item, sortable: true} : item));
}

export const CollectionList = (
  {
    //results = [],
    currentUser,
    //loading,
    collection,
    options,
    getOptions,
    sort,
    basePath, // eg /customers
    newPath = "/new", // relative to the baseRoute,
    editPath = "/edit", // relative to the baseRoute
    detailsPath,
    addText,
    addTextToken,
    headerText,
    headerTextToken,
    basicColumns, // to replace all columns
    customColumns = [], // already customized columns
    customActions = [], // user defined actions
    check,
    classes,
    paginate,
    sortableColumns = [],
  },
  { intl }
) => (
  <div>
    <Grid container className={classes.headerWrapper}>
      <Grid item sm={6} xs={12}>
        <Typography variant="title" color="inherit" className="tagline">
          {headerText ||
            (headerTextToken && <FormattedMessage id={headerTextToken} />) ||
            collection.typeName ||
            collection.options.collectionName}
        </Typography>
      </Grid>
      {/*
      {collection.options.mutations.new.check(currentUser) && (
        <Grid item sm={6} xs={12} className={classes.addButtonWrapper}>
          <Components.Button
            component={Link}
            to={newPath}
            variant="contained"
            color="secondary"
          >
            <PlusIcon />
            {addText || (
              <FormattedMessage
                id={addTextToken || "collectionAdmin.default.add"}
              />
            )}
          </Components.Button>
        </Grid>
      )}
      */}
    </Grid>
    <Grid item md={12}>
      <div className={classes.datatableWrapper}>
        <Components.Datatable
          collection={collection}
          options={options || (getOptions && getOptions(currentUser))}
          showEdit={false}
          sort={sort}
          dense="denser"
          columns={setSortable(sortableColumns, [
            buildActionsColumn({
              name: intl.formatMessage({
                id: "collectionAdmin.collectionList.actions"
              }),
              collection,
              editPath,
              detailsPath,
              basePath,
              customActions,
              currentUser
            }),
            // generate the default columns for non specific columns
            ...buildDefaultColumns(
              collection.options.schema,
              basicColumns || getDefaultColumns(collection, currentUser)
            ),
            ...customColumns
          ])}
          paginate={paginate}
        />
      </div>
    </Grid>
  </div>
);
CollectionList.contextTypes = {
  intl: intlShape
};

export default CollectionList;
registerComponent({
  name: "CollectionList",
  component: CollectionList,
  hocs: [withCurrentUser, [withStyles, styles]]
});
