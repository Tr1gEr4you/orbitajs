import { Application } from "../core/application/application";
import { jsonParser } from "../lib/middlewares/jsonParser";

export const app = new Application();

app.router.post({
    url: "/users",
    handler: (req, res) => {
        console.log(req.body);

        res.status(300).json("Success");
    },
});

app.use({ url: "/users", handler: jsonParser });

app.use({
    url: "/users",
    method: "POST",
    handler: (req, res) => {
        const body = req.body;

        const users = [{ id: 1, name: "Tr1gEr" }];

        res.json({ data: users, bodyInput: body });
    },
});

app.listen({ hostname: "localhost", port: 4000 });
