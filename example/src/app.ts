import { bodyParser } from '@orbitajs/common'
import { Application } from '@orbitajs/core'
import { userRouter } from './user'

const app = new Application()

app.useMiddleware({ handler: bodyParser })

app.useRouter(userRouter)

app.listen({hostname: "localhost", port: 4000})
