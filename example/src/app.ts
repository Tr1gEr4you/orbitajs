import { bodyParser, cookieParser, cors, httplogger, Request, Response } from '@orbitajs/common'
import { Application } from '@orbitajs/core'

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


/*
app.useMiddlewares([
    { handler: cors({methods: ["GET"]}) },
    { handler: bodyParser },
    { handler: cookieParser },
])
 */

//app.useRouter(userRouter)
app.useRoute({
    url: "/test", method: "GET", handler: () => {
        console.log("/TEST")

        return {message: "OK"}
}})

app.listen({hostname: "localhost", port: 4000})
