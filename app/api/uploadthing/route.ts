import { createNextRouteHandler } from "uploadthing/next";

import { uploadRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
});
