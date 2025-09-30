import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

const UseSwagger = (app: Application) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

export { UseSwagger }