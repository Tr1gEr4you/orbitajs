import { Application } from "../../core/application/application";
import userRoutes from "./routes";

const app = new Application();

app.use(userRoutes);

app.listen({ hostname: "localhost", port: 4000 });
