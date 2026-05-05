import { Request, Response } from '@orbitajs/common'
import { Application } from '@orbitajs/core'
import { userRouter } from './user'

export async function bodyParser1(req: Request, res: Response) {
    console.log("Parser")

    return new Promise<void>((resolve, reject) => {
        let body = "";

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                req.body = JSON.parse(body);
                resolve();
            } catch (err) {
                console.error("Ошибка парсинга");
                reject(err);
            }
        });

        req.on('error', (err) => {
            console.error("Ошибка потока:", err);
            reject(err);
        });
    });
}


const app = new Application()

function testMiddleware(req: Request, res: Response) {
    console.log("CRPT")
    console.log(req.body)
}

function testMiddleware2(req: Request, res: Response) {
    console.log("CRPT2")
    console.log(req.body)
}


app.useMiddleware({ handler: bodyParser1 })
app.useMiddleware({ url: "/crpt/*", handler: testMiddleware })
app.useMiddleware({ url: "/crpt", handler: testMiddleware2})

app.useRouter(userRouter)
app.useRoute({
    url: "/1", method: "POST", handler: (req, res) => {
        console.log(`1: `, req.body)
}})

app.listen({hostname: "localhost", port: 4000})
