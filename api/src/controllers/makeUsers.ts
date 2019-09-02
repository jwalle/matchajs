import devRoutes from "../routes/devRoutes";
let request = require('request');


class MakeUsers {
    socket: SocketIO.Socket

    constructor(socket: SocketIO.Socket) {
        this.socket = socket;
        this.connected();
    }

    public getNumber = (nb) => {
        console.log('Number is here :', nb);
    }

    public getUsers = (nb: number) => {
        return new Promise(function (resolve, reject) {
            let options = {
                url: 'https://randomuser.me/api/?nat=gb,fr,dk,ca,us,de&results=' + nb,
                dataType: 'json'
            };
            request.get(options, function (error, response, body) {
                if (!error) {
                    resolve(body);
                } else {
                    console.log('ERROR API: ', error)
                    reject('error request user : ' + error);
                }
            })
        })
    }

    connected() {
        console.log('connected');


        const getNumber = async (nb) => {
            console.log('Number is here :', nb);
            let index = 0;
            this.getUsers(nb)
                .then(async (response: any) => {
                    return (JSON.parse(response).results);
                })
                .then((users) => {
                    // console.log('Users: ', users);
                    if (users) {
                        users.map((user) => {
                            devRoutes.fillDb(user)
                                .then((result: any) => {
                                    if (result) {
                                        index++;
                                        this.socket.emit("COUCOU", index)
                                    }
                                })
                            // console.log(user)
                        })
                    }
                })

        }

        this.socket.on('disconnect', disconnect)

        this.socket.on('NUMBER', getNumber)

        function disconnect() {
            console.log('disconnect');
        }
    }
}

export default MakeUsers;
