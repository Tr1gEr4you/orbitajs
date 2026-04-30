import { Application } from "../../core/application/application";
import { jsonParser } from "../../lib/middlewares/jsonParser";
import userRoutes from "./routes";

const app = new Application();

app.use({ url: "*", handler: jsonParser });
app.use(userRoutes);

app.listen({ hostname: "localhost", port: 4000 });
