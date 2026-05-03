import { BadRequestError } from "@orbita-js/common"

export class UserService {
    private readonly users = [{ id: 1, name: "OrbitaJS" }]

    public getUserById(id: number) {
        const user = this.users.find((user) => user.id === id)
        if (!user) throw new BadRequestError("Пользователь не найден")
        return user
    }
}
