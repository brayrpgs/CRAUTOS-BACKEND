// src/app.ts
import express from 'express'
import { RegisterRoutes } from './routes/routes.js'
import { UseSwagger } from './middlewares/swagger.js'
import { useUrlEncoded } from './middlewares/urlencoded.js'
import { UseJson } from './middlewares/json.js'
import { UseSession } from './middlewares/session.js'
import { UsePassport } from './middlewares/passport.js'
import { passport } from './auth/passport.js'
import jwt from 'jsonwebtoken'
import { UserGoogle } from './models/UserGoogle.js'
import { user } from './models/user.js'
import { log } from 'console'
import { errorPostgRest } from './models/errorPostgRest.js'
import { sendEmail } from './services/Emails.js'
import { UseCors } from './middlewares/cors.js';
import { successAuthHTML } from './resources/templates/successAuth.js'
import { errorAuthHTML } from './resources/templates/errorAuth.js'

const app = express()

// middlewares
UseSwagger(app)
useUrlEncoded(app)
UseJson(app)
UseSession(app)
UsePassport(app)
UseCors(app)

// Setup passport routes manually since TSOA can't handle authentication flows
app.get('/auth/login', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/error?code=auth_failed' }),
  async (req, res) => {
    // se verifica si esta autenticado
    if (req.user === undefined) {
      return res.redirect('/auth/error?code=auth_failed');
    }
    // se instancia el usuario
    const user = req.user as UserGoogle
    // se intenta crear o recuperar el usuario en la base de datos
    try {
      // primero crear el usuario
      log('Creating or retrieving user:', user.emails[0].value)
      const create = await global.fetch(
        'http://postgrest:3000/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Prefer: 'return=representation'
          },
          body: JSON.stringify({
            name: user?.name.givenName,
            last_name: user?.name.familyName,
            email: user?.emails[0].value,
            idcard: 'none',
            age: 0,
            id_audit: null,
            rol: 2,
            id_images: null
          })
        }
      )
      const data = await create.json() as user[] | errorPostgRest
      let token: string;

      if ('code' in data) {
        if (data.code === '23505') {
          const retrieve = await global.fetch(
            `http://postgrest:3000/users?email=eq.${user.emails[0].value}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Range-Unit': 'items'
              }
            }
          )
          const retrievedData = await retrieve.json() as user[]
          if (retrievedData.length === 0) {
            return res.redirect('/auth/error?code=user_not_found');
          }
          token = jwt.sign(retrievedData[0], process.env.SESSION_SECRET as string);
        } else {
          console.log('error: ', data)
          return res.redirect('/auth/error?code=database_error');
        }
      } else {
        await sendEmail(data[0].email, data[0].name)
        token = jwt.sign((data as user[])[0], process.env.SESSION_SECRET as string);
      }

      // Enviar página HTML que se comunica con el opener
      return res.send(successAuthHTML(token));

    } catch (error) {
      if (error instanceof Error) {
        log('Error during user creation/retrieval:', error);
        return res.redirect('/auth/error?code=server_error');
      } else {
        return res.redirect('/auth/error?code=unknown_error');
      }
    }
  }
);

// Ruta para manejar errores de autenticación
app.get('/auth/error', (req, res) => {
  const errorCode = req.query.code?.toString() || 'unknown_error';
  const errorMessages: Record<string, string> = {
    auth_failed: 'Falló la autenticación con Google',
    user_not_found: 'No se pudo encontrar o crear el usuario',
    database_error: 'Error en la base de datos',
    server_error: 'Error en el servidor',
    unknown_error: 'Error desconocido'
  };

  res.send(errorAuthHTML(errorMessages, errorCode));
});

// register routes to use swaggerUi
RegisterRoutes(app)

export { app }