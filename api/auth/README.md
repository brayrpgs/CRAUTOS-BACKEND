# Google Authentication Implementation

This implementation provides Google OAuth 2.0 authentication for the CRAUTOS backend API.

## Configuration

### Environment Variables

Add the following environment variables to your `.env` file:

```env
GOOGLE_CLIENT_ID='your-google-client-id'
GOOGLE_CLIENT_SECRET='your-google-client-secret'
GOOGLE_CALLBACK_URL='http://localhost:3000/auth/google/callback'
SESSION_SECRET='your-session-secret-key'
```

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create "OAuth 2.0 Client ID"
5. Add authorized redirect URIs (e.g., `http://localhost:3000/auth/google/callback`)
6. Copy the Client ID and Client Secret to your `.env` file

## Endpoints

### `/auth/login` (GET)
Initiates the Google OAuth authentication flow. When accessed, it redirects the user to Google's login page.

**Usage:**
```
GET http://localhost:3000/auth/login
```

### `/auth/google/callback` (GET)
Google OAuth callback endpoint. Google redirects here after successful authentication.

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "google-user-id",
    "displayName": "User Name",
    "emails": [...],
    "photos": [...]
  }
}
```

### `/auth/logout` (GET)
Logs out the current user and destroys the session.

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### `/auth/user` (GET)
Returns the current authenticated user's information.

**Response (authenticated):**
```json
{
  "success": true,
  "message": "User authenticated",
  "user": {
    "id": "google-user-id",
    "displayName": "User Name",
    "emails": [...],
    "photos": [...]
  }
}
```

**Response (not authenticated):**
```json
{
  "success": false,
  "message": "Not authenticated"
}
```

## Testing the Authentication Flow

1. Start the server:
   ```bash
   npm run build
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/auth/login
   ```

3. You will be redirected to Google's login page

4. After successful authentication, you'll be redirected back to the callback endpoint with your user information

5. Check your session by visiting:
   ```
   http://localhost:3000/auth/user
   ```

## Architecture

- **Passport.js**: Handles OAuth authentication strategy
- **express-session**: Manages user sessions
- **TSOA**: Provides OpenAPI/Swagger documentation for the endpoints
- **Clean Code**: All configuration is read from environment variables

## Security Notes

- Session cookies are set to `secure: true` in production mode
- Session secret should be a strong, randomly generated string in production
- Make sure to add your production callback URL to Google OAuth authorized redirect URIs
