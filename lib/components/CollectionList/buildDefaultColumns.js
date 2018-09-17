import React from "react";
import CheckIcon from "mdi-material-ui/Check";
import HelpIcon from "mdi-material-ui/Help";
import moment from "moment";
import { setupCollectionAdminPages } from "../../modules";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";

const DateTimeCell = ({ column, document }) => {
  if (!column) return "-"
  const date = document[column.name];
  if (!date) return "-"
  return (
    <div>
      <div>{moment(date).format("dddd DD/MM/YYYY HH:mm")}</div>
      <div>{moment.duration(moment(date).diff(moment())).humanize(true)}</div>
    </div>
  );
};

const getCellComponent = (fieldName, schema) => {
  switch (fieldName) {
    case "createdAt":
      return DateTimeCell;
  }
  const fieldSchema = schema[fieldName];
  if (!fieldSchema) return undefined;
  const input = fieldSchema.input || fieldSchema.control;

  switch (input) {
    // use custom display compoent
    case "datetime":
      return DateTimeCell;
    case "checkdiv":
      return ({ column, document }) => {
        if (document[column] === true)
          return (
            <span>
              <CheckIcon />
              <FormattedMessage id="collectionAdmin.default.yes" />
            </span>
          );
        if (document[column] === false)
          return <FormattedMessage id="collectionAdmin.default.no" />;
        return (
          <span>
            <HelpIcon />
            <FormattedMessage id="collectionAdmin.default.unknown" />
          </span>
        );
      };
  }
  return undefined;
};

/**
 * Build sensible columns from the schema
 * @param {*} displayedSchemaFields
 *
 */
export const buildDefaultColumns = (schema, displayedFields) => {
  return displayedFields.map(field => {
    const CellComponent = getCellComponent(field, schema);
    return {
      name: field,
      component: CellComponent
    };
  });
};
export default buildDefaultColumns;
