import * as http from 'http';
import * as debug from "debug";
import * as dotenv from 'dotenv';

import Api from './Api';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
Api.set('port', port);

dotenv.config();
const server = http.createServer(Api);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val:number|string) : number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error: NodeJS.ErrnoException) : void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} require elevated privileges yo`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use yo`);
            process.exit(1);            
        default:
            throw error;
    }
}

function onListening() : void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
