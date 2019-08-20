import makeUsers from './makeUsers';

class RootSocket {
    io: SocketIO.Server;

    constructor(io: SocketIO.Server) {
        this.io = io;
        this.init();
    }


    init() {
        this.io.of('/makeUsers').on('connection', (socket) => {
            new makeUsers(socket);
        })
    }
}

export default RootSocket;