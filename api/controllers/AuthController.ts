import { Controller, Get, Route, Request, Response } from "tsoa";
import { Request as ExpressRequest } from "express";
import { UserGoogle } from "api/models/UserGoogle";

interface AuthResponse {
    success: boolean;
    message: string;
    user?: any;
}

@Route("auth")
export class AuthController extends Controller {
    /**
     * Initiates Google OAuth authentication
     */
    @Get("login")
    @Response(200, "Redirects to Google OAuth")
    public async login(): Promise<void> {
        // This will be handled by passport middleware
        // The actual redirect will be handled in the server configuration
    }

    /**
     * Google OAuth callback endpoint
     */
    @Get("google/callback")
    @Response(200, "Authentication successful")
    @Response(401, "Authentication failed")
    public async googleCallback(@Request() req: ExpressRequest): Promise<AuthResponse> {
        // This will be handled by passport middleware
        // After successful authentication, the user will be in req.user
        const user = (req as ExpressRequest & { user?: UserGoogle }).user as UserGoogle | undefined;
        if (user) {
            return {
                success: true,
                message: "Authentication successful",
                user: user.displayName
            };
        } else {
            this.setStatus(401);
            return {
                success: false,
                message: "Authentication failed"
            };
        }
    }
}
