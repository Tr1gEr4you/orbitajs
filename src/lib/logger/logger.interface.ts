export interface ILogger {
    log(...messages: any[]): void;
    warning(...messages: any[]): void;
    error(...messages: any[]): void;
}

export type LogType = "LOG" | "WARNING" | "ERROR";
