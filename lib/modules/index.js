import "./routes";
import "./components";
import "./i18n";

export {
  default as createCollectionComponents
} from "./createCollectionComponents";
export * from "./setupCollectionMenuItems";

export { default as setupCollectionRoutes } from "./setupCollectionRoutes";

export { default, default as setupBackoffice } from "./setupBackoffice";
