import { Router } from "../../core/router/router";

const router = new Router();

router.add({
    url: "/users",
    method: "GET",
    handler: (req, res) => {
        const users = [{ id: 1, name: "Tr1gEr" }];

        res.status(200).json(users);
    },
});

router.post({
    url: "/users",
    handler: (req, res) => {
        res.json({ input: req.body });
    },
});

export default router;
