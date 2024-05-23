import { Hono } from "@hono";
import { cors, serveStatic } from "@hono/middleware";
import { load } from "@dotenv";
import { RESTfulCollections } from "@czechitas/restful-collections";

const api = await new RESTfulCollections()
    .collection("projects")
    .collection("tasks", {
        keyBuilder: (value) => (value.time ? [value.project, value.date, value.time] : [value.project, value.date, "*"])
    })
    .buildServer();

const app = new Hono();

const env = await load();
if (env["CORS_ORIGIN"]) {
    app.use("/api/*", cors({
        origin: env["CORS_ORIGIN"].split(/, */),
    }));
}
app.route("/api", api);
app.use('/*', serveStatic({ root: './' }));
app.get('*', serveStatic({ path: './index.html' }));

export default app
