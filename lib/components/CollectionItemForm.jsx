/**
 * Generic page for a collection item new/edit form
 * Must be handled by the parent:
 * - documentId
 * - mutationFragment and collection
 *
 */
import React from "react";
import {
  Components,
  getFragment,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
import { toast } from "react-toastify";
import { getCollectionDisplayName } from "../modules/namingHelpers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NoSsr from "@material-ui/core/NoSsr";
import ArrowLeftBoldIcon from "mdi-material-ui/ArrowLeftBold";
import { Link, browserHistory, withRouter } from "react-router";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  addButtonWrapper: {
    textAlign: "right"
  },
  headerWrapper: {
    padding: theme.spacing.unit * 4
  }
});

export const CollectionItemForm = (
  {
    collection,
    currentUser,
    documentId,
    mutationFragment,
    queryFragment,
    closeModal,
    basePath,
    fields,
    headerText,
    headerTextToken,

    submitCallback,
    successCallback,

    showReturnButton = true,

    classes,

    history,

    ...otherProps
  },
  { intl }
) => (
  <div>
    <Grid container className={classes.headerWrapper}>
      <Grid item sm={showReturnButton ? 6 : 12} xs={12}>
        <Typography variant="title" color="inherit" className="tagline">
          {headerText ||
            (headerTextToken && (
              <FormattedMessage
                id={headerTextToken + (documentId ? ".edit" : ".new")}
              />
            )) || (
              <span>
                <FormattedMessage
                  id={`collectionAdmin.default.${documentId ? "edit" : "new"}`}
                />
                {` ${collection.typeName}`}
              </span>
            )}
        </Typography>
      </Grid>
      {showReturnButton && (
        <Grid item sm={6} xs={12} className={classes.addButtonWrapper}>
          <Components.Button
            onClick={() => history.goBack()}
            variant="contained"
            color="secondary"
          >
            <ArrowLeftBoldIcon />
            <FormattedMessage id="collectionAdmin.default.go_back" />
          </Components.Button>
        </Grid>
      )}
    </Grid>
    {(documentId || collection.options.mutations.new.check(currentUser)) && (
      <div>
        <NoSsr>
          <Components.SmartForm
            collection={collection}
            mutationFragment={
              mutationFragment ? getFragment(mutationFragment) : undefined
            }
            queryFragment={
              queryFragment ? getFragment(queryFragment) : undefined
            }
            fields={fields ? fields : undefined}
            /* for edition */
            documentId={documentId}
            showRemove={!!documentId}
            errorCallback={(document, error) => {
              toast.error(
                intl.formatMessage({
                  id: "collectionAdmin.collectionItemForm.error"
                })
              );
            }}
            removeSuccessCallback={document => {
              toast.success(
                intl.formatMessage({
                  id: "collectionAdmin.collectionItemForm.deleted"
                })
              );
              if (closeModal) {
                closeModal();
              }
            }}
            submitCallback={submitCallback || undefined}
            successCallback={document => {
              if (successCallback) {
                successCallback(document);
              }
              toast.success(
                intl.formatMessage({
                  id: documentId
                    ? "collectionAdmin.collectionItemForm.updated"
                    : "collectionAdmin.collectionItemForm.created"
                })
              );
              // close the modal on edit mode
              if (closeModal) {
                closeModal();
              }
              // go back to the previous page
              history.goBack();
            }}
            {...otherProps}
          />
        </NoSsr>
      </div>
    )}
  </div>
);

CollectionItemForm.contextTypes = {
  intl: intlShape
};
CollectionItemForm.propTypes = {
  headerText: PropTypes.string,
  headerTextToken: PropTypes.string,
  history: PropTypes.object.isRequired,
};
export default CollectionItemForm;
registerComponent({
  name: "CollectionItemForm",
  component: CollectionItemForm,
  hocs: [withCurrentUser, withRouter, [withStyles, styles]]
});
