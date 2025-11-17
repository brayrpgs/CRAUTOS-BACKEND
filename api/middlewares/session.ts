import session from 'express-session';
import { Express } from 'express';

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-key';

export function UseSession(app: Express): void {
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            }
        })
    );
}
