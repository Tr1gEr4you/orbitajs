import { Request, Response } from "@orbita-js/common";
import { UserService } from "./user.service";

export class UserController {
    public constructor(private readonly userService: UserService) { }

    public getUserById(req: Request, res: Response) {
        return this.userService.getUserById(req.body.id)
    }
}
