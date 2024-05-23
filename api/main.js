import { Hono } from "@hono";
import { cors, serveStatic } from "@hono/middleware";
import { RESTfulCollections } from "@czechitas/restful-collections";

const api = await new RESTfulCollections()
    .collection("projects")
    .collection("tasks", {
        keyBuilder: (value) => (value.time ? [value.project, value.date, value.time] : [value.project, value.date, "*"])
    })
    .buildServer();

const app = new Hono();

if (Deno.env.has("CORS_ORIGIN")) {
    app.use("/api/*", cors({
        origin: Deno.env.has("CORS_ORIGIN").split(/, */),
    }));
}
app.route("/api", api);
app.use('/*', serveStatic({ root: './' }));
app.get('*', serveStatic({ path: './index.html' }));

export default app
