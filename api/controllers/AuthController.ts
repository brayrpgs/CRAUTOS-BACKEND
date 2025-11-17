import { Controller, Get, Route, Request, Response } from "tsoa";
import { Request as ExpressRequest } from "express";

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
        if (req.user) {
            return {
                success: true,
                message: "Authentication successful",
                user: req.user
            };
        } else {
            this.setStatus(401);
            return {
                success: false,
                message: "Authentication failed"
            };
        }
    }

    /**
     * Logout endpoint
     */
    @Get("logout")
    @Response(200, "Logout successful")
    public async logout(@Request() req: ExpressRequest): Promise<AuthResponse> {
        req.logout((err) => {
            if (err) {
                console.error("Logout error:", err);
            }
        });
        return {
            success: true,
            message: "Logout successful"
        };
    }

    /**
     * Get current user session
     */
    @Get("user")
    @Response(200, "User retrieved")
    @Response(401, "Not authenticated")
    public async getUser(@Request() req: ExpressRequest): Promise<AuthResponse> {
        if (req.user) {
            return {
                success: true,
                message: "User authenticated",
                user: req.user
            };
        } else {
            this.setStatus(401);
            return {
                success: false,
                message: "Not authenticated"
            };
        }
    }
}
