/***
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/background",
  "/projects",
  "/workExperience",
  "/bus",
  "/bus/search"
];

/***
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /home
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
];

/***
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/***
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
