import { Application } from "../../core/application/application";
import { jsonParser } from "../../lib/middlewares/jsonParser";

const app = new Application();

app.use({ url: "*", handler: jsonParser });

app.use({
    url: "/users",
    method: "GET",
    handler: (req, res) => {
        const users = [{ id: 1, name: "Tr1gEr" }];

        res.status(200).json(users);
    },
});

app.listen({ hostname: "localhost", port: 4000 });
