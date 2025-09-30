import { Application, json } from "express";

const UseJson = (app: Application) => {

    app.use(json());
}

export { UseJson }