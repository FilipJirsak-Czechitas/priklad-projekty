import { Hono } from "@hono";
import { cors } from "@hono/cors";
import { serveStatic } from "@hono/deno";
import { load } from "@dotenv";
import { createCollections } from "@czechitas/restful-collections";

const collections = await createCollections({
  projects: {},
  tasks: {
    secondaryIndexes: {
      "by-project": (value) =>
        value.time
          ? [value.project, value.date, value.time]
          : [value.project, value.date, "*"],
    },
  },
});

const app = new Hono();

const env = await load();
if (env["CORS_ORIGIN"]) {
  app.use(
    "/api/*",
    cors({
      origin: env["CORS_ORIGIN"].split(/, */),
    })
  );
}
app.route("/api", collections.buildServer());
app.use("/*", serveStatic({ root: "./" }));
app.get("*", serveStatic({ path: "./index.html" }));

export default app;
