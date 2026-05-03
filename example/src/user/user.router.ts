import { Router } from "@orbita-js/core";
import { userController } from "./user.construct";

export const router = new Router()

router.post({url: "/users", handler: (req, res) => userController.getUserById(req, res)})
