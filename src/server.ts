import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');
import socketIO = require('socket.io');

export default class Server {

    public app: express.Application;
    private http: http.Server | undefined;
    public io: SocketIO.Server | undefined;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Access to a public folder
        this.app.use(express.static(__dirname + '/../public'));
    }

    public listen(port: number): void {
        process.env.PORT = process.env.PORT || port.toString();
        const P = process.env.PORT;
        // If you dont use socket.io
        /*this.app.listen(process.env.PORT , () => {
            console.log('Express server listening on port ' + P);
            console.log('If you are using locally you can access with: http://localhost:' + P);
        })*/
        this.initSockets(port);
    }

    private initSockets(port: number): void {
        this.http = http.createServer(this.app);
        this.io = socketIO.listen(this.http);
        this.http.listen(port, () => {
            console.log('Express server listening on port ' + port);
            console.log('If you are using locally you can access with: http://localhost:' + port);
        });
    }

}