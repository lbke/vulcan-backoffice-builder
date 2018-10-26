Package.describe({
  name: "vulcan:backoffice-builder"
});

Package.onUse(api => {
  api.use([
    "vulcan:core",
    "erikdakoda:vulcan-material-ui",
    "vulcan:more-helpers",
    "vulcan:i18n",
    "vulcan:menu"
  ]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});

Package.onTest(function(api) {
  api.use(["ecmascript", "meteortesting:mocha", "vulcan:core"]);
  api.mainModule("./test/index.js");
});
