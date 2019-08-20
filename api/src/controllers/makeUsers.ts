class MakeUsers {
    socket: SocketIO.Socket

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.connected();
    }

    public getNumber = (nb) => {
        console.log('Number is here :', nb);
    }

    connected() {
        console.log('connected');

        const getNumber = (nb) => {
            console.log('Number is here :', nb);
            this.socket.emit("COUCOU", "welcome to chess online");
        }

        this.socket.on('disconnect', disconnect)

        this.socket.on('NUMBER', getNumber)

        function disconnect() {
            console.log('disconnect');
        }
    }
}

export default MakeUsers;
