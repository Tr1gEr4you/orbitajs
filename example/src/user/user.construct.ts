import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { router } from "./user.router";

export const userSerivce = new UserService()
export const userController = new UserController(userSerivce)

export const userRouter = router
