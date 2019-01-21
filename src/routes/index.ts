import { Application, Request, Response } from "express";

export default class Routes {

    public init(app: Application): void {

        app.route('/')
            .get((req: Request, res: Response) => {
                res.render('home');
            })
    }
}