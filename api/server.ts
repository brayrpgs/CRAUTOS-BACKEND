// src/app.ts
import express from "express";
import { RegisterRoutes } from "./routes/routes.js";
import { UseSwagger } from "./middlewares/swagger.js";
import { useUrlEncoded } from "./middlewares/urlencoded.js";
import { UseJson } from "./middlewares/json.js";
import { UseSession } from "./middlewares/session.js";
import { UsePassport } from "./middlewares/passport.js";
import { passport } from "./auth/passport.js";
import jwt from "jsonwebtoken";

const app = express();

//middlewares
UseSwagger(app)
useUrlEncoded(app)
UseJson(app)
UseSession(app)
UsePassport(app)

// Setup passport routes manually since TSOA can't handle authentication flows
app.get('/auth/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    if (req.user !== undefined) {
      const token = jwt.sign(req.user, process.env.SESSION_SECRET as string);
      res.json({
        success: true,
        message: 'Authentication successful',
        usertoken: token
      });
    } else {
      res.status(401).json({ success: false, message: 'Authentication failed' });
    }

  }
);

//register routes to use swaggerUi
RegisterRoutes(app);

export { app }
