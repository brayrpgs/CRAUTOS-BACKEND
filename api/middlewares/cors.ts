import { Application } from "express";
import cors from "cors";

const UseCors = (app: Application) => {

    app.use(cors({
        origin: 'http://localhost:4321',
        credentials: true
    }))
}

export { UseCors }