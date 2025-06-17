import pkg from "path-to-regexp";
const { pathToRegexp } = pkg;

/**
 * Utility function to validate route patterns
 * @param {string} pattern - The route pattern to validate
 * @returns {boolean} Whether the pattern is valid
 */
export const validateRoutePattern = (pattern) => {
  try {
    // This will throw an error if the pattern is invalid
    pathToRegexp(pattern);
    return true;
  } catch (error) {
    console.error(`Invalid route pattern: ${pattern}`);
    console.error(error);
    return false;
  }
};

/**
 * Validate all routes in an Express router
 * @param {Object} router - Express router
 * @param {string} basePath - Base path prefix
 * @returns {Array} Array of invalid routes
 */
export const validateRoutes = (router, basePath = "") => {
  const invalidRoutes = [];

  // Check if router has routes (Express 4.x style)
  if (router.stack) {
    router.stack.forEach((layer) => {
      if (layer.route) {
        // This is a route
        const fullPath = basePath + (layer.route.path || "");
        if (!validateRoutePattern(fullPath)) {
          invalidRoutes.push({
            path: fullPath,
            methods: Object.keys(layer.route.methods),
          });
        }
      } else if (layer.name === "router" && layer.handle.stack) {
        // This is a sub-router
        const prefix = layer.regexp.source
          .replace("\\/?(?=\\/|$)", "")
          .replace(/\\\//g, "/")
          .replace(/\^|\$/g, "");
        invalidRoutes.push(...validateRoutes(layer.handle, basePath + prefix));
      }
    });
  }

  return invalidRoutes;
};
