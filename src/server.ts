import express = require('express');
import bodyParser = require('body-parser');
import hbs = require('express-handlebars');
import http = require('http');
import socketIO = require('socket.io');

import Routes from './routes/index';
import setSockets from './socket/index';

export default class Server {

    private app: express.Application;
    private routes: Routes = new Routes();
    private http: http.Server | undefined;
    public io: SocketIO.Server | undefined;

    constructor(PORT: number) {
        this.app = express();
        this.routes.init(this.app);
        this.config();
        // Run Server
        this.listen(PORT);
        this.io = setSockets(this.io);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Access to a public folder
        this.app.use(express.static(__dirname + '/../public'));
        // Express Handlebars engine
        this.app.engine('hbs', hbs({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: __dirname + '/../views/layouts/',
            partialsDir: __dirname + '/../views/partials/'
        }));
        this.app.set('view engine', 'hbs');
    }

    private listen(port: number): void {
        process.env.PORT = process.env.PORT || port.toString();
        // Prepare to sockets
        this.http = http.createServer(this.app);
        this.io = socketIO.listen(this.http);
        this.http.listen(port, () => {
            console.log('Express server listening on port ' + port);
            console.log('If you are using locally you can access with: http://localhost:' + port);
        });
    }

}