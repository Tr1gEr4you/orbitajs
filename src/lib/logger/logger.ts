import { ILogger, LogType } from "./logger.interface";

export class Logger implements ILogger {
    private readonly _name: string;

    public constructor(name: string) {
        this._name = name;
    }

    public error(...messages: any[]) {
        this._log(messages, "ERROR");
    }

    public warning(...messages: any[]) {
        this._log(messages, "WARNING");
    }

    public log(...messages: any[]) {
        this._log(messages, "LOG");
    }

    private _log(messages: any[], level: LogType) {
        const timestamp = new Date().toLocaleString();

        console.log("[Orbita] - " + timestamp + ` | ${level} ` + `[${this._name}]`, ...messages);
    }
}
