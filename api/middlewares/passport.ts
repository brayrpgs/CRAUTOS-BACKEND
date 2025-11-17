import { Express } from 'express';
import { passport } from '../auth/passport.js';

export function UsePassport(app: Express): void {
    app.use(passport.initialize());
    app.use(passport.session());
}
