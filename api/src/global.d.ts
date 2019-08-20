declare module NodeJS {
    interface Global {
        appRoot: string,
        io: SocketIO.Server,
    }
}