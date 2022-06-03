import Auth from "./pages/Auth";
import Posts from "./pages/Posts";
import { LOGIN_ROUTE, POSTS_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: POSTS_ROUTE,
    Component: Posts,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: POSTS_ROUTE,
    Component: Posts,
  },
];
