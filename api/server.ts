// src/app.ts
import express from "express";
import { RegisterRoutes } from "./routes/routes.js";
import { UseSwagger } from "./middlewares/swagger.js";
import { useUrlEncoded } from "./middlewares/urlencoded.js";
import { UseJson } from "./middlewares/json.js";

const app = express();

//middlewares
UseSwagger(app)
useUrlEncoded(app)
UseJson(app)

//register routes to use swaggerUi
RegisterRoutes(app);

export { app }