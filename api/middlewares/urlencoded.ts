import { Application, urlencoded } from "express";

const useUrlEncoded = (app: Application) => {
    app.use(
        urlencoded({
            extended: true,
        })
    );
}

export { useUrlEncoded }