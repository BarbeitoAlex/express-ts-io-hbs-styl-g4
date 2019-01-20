import express = require('express');
import * as bodyParser from "body-parser";

export default class ServerExpress {

    public app: express.Application;

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
        this.app.listen(process.env.PORT , () => {
            console.log('Express server listening on port ' + P);
            console.log('If you are using locally you can access with: http://localhost:' + P);
        })
    }

}