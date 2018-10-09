const defaultOptions = {
  list: { accessGroups: ["admins"], accessRedirect: "/" },
  details: { accessGroups: ["admins"], accessRedirect: "/" },
  form: { accessGroups: ["admins"], accessRedirect: "/" },
  basePath: undefined // will be computed depending on the collection
};
export default defaultOptions;
