import { bodyParser } from '@orbita-js/common'
import { Application } from '@orbita-js/core'
import { userRouter } from './user'

const app = new Application()

app.useMiddleware({ handler: bodyParser })

app.useRouter(userRouter)

app.listen({hostname: "localhost", port: 4000})
