# Movie App Backend 🎬

RESTful API built with ASP.NET Core 10. Provides authentication services, JWT token management, and SQLite database integration with Entity Framework Core for the Movie Application.

## Quick Start

```bash
cd movie-app/backend/movieBackend
dotnet restore
dotnet run
```

Backend: `https://localhost:5001`

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Development](#development)

## Features

✨ **Authentication**
- User registration and login
- JWT token-based authorization
- Token refresh mechanism
- Secure logout

🔐 **Security**
- BCrypt password encryption
- JWT token validation
- CORS protection
- Secure token management

## Technology Stack

- **Framework**: ASP.NET Core 10
- **Language**: C#
- **Database**: SQLite
- **ORM**: Entity Framework Core 10
- **Authentication**: JWT Bearer Tokens
- **Encryption**: BCrypt.Net-Next 4.0.3

## Installation

### Requirements

- .NET SDK 10 or higher
- Visual Studio or VS Code

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app/backend/movieBackend

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```

## Configuration

### appsettings.json

```json
{
  "Jwt": {
    "Key": "your-secret-key-min-32-characters-long",
    "Issuer": "your-issuer",
    "Audience": "your-audience"
  },
  "ConnectionStrings": {
    "DefaultConnection": "DataSource=movie.db"
  }
}
```

### appsettings.Development.json

```json
{
  "Jwt": {
    "Key": "dev-secret-key-minimum-32-characters-long",
    "Issuer": "http://localhost:5000",
    "Audience": "http://localhost:4200"
  }
}
```

### CORS Settings

Frontend URL is configured in `Program.cs`:

```csharp
policy.WithOrigins(
    "http://localhost:4200",
    "https://movie-app-f632f.web.app/"
).AllowAnyHeader().AllowAnyMethod().AllowCredentials()
```

## API Endpoints

### 🔓 Authentication (Public Endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/refresh` | Refresh token |

### 🔐 Authentication (Protected Endpoints)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/logout` | User logout |

## Request/Response Examples

### Register

**Request:**
```json
POST /auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "guid-string",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Login

**Request:**
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "guid-string",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Refresh Token

**Request:**
```json
POST /auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### Logout

**Request:**
```json
POST /auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 500 | Server error |

## Database

### Schema

**Users Table:**
- Id (GUID)
- Username (string, unique)
- Email (string, unique)
- PasswordHash (string)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)

**RefreshTokens Table:**
- Id (GUID)
- UserId (GUID, foreign key)
- Token (string)
- ExpiryDate (DateTime)
- IsRevoked (bool)
- CreatedAt (DateTime)

### Database Setup

```bash
# Apply migrations
dotnet ef database update

# Reset database
dotnet ef database drop
dotnet ef database update
```

## Development

### Project Structure

```
movieBackend/
├── Data/
│   └── AppDbContext.cs              # EF Core context
├── Models/
│   ├── User.cs
│   ├── RefreshToken.cs
│   └── DTOs/
│       ├── LoginRequest.cs
│       ├── LoginResponse.cs
│       ├── LogoutRequest.cs
│       ├── RefreshRequest.cs
│       └── RegisterRequest.cs
├── Services/
│   ├── AuthService.cs               # Business logic
│   ├── IAuthService.cs              # Interface
│   └── PasswordService.cs            # Password services
├── Program.cs                        # Application setup
└── movieBackend.csproj
```

### Running

**Debug Mode:**
```bash
dotnet run
```

**Release Mode:**
```bash
dotnet run --configuration Release
```

**Watch Mode (auto-restart on file changes):**
```bash
dotnet watch run
```

### Production Build

```bash
dotnet publish -c Release -o ./publish
```

### Testing API Calls

Use the `movieBackend.http` file to test API endpoints.

## Security Best Practices

✅ **Implemented:**
- JWT token validation
- BCrypt password encryption
- CORS protection
- Refresh token mechanism

⚠️ **Recommendations:**
- Use strong secret keys in production
- Enforce HTTPS
- Implement rate limiting
- Set shorter token expiration times
- Disable sensitive logging in production

## Troubleshooting

### CORS Error
```
Access to XMLHttpRequest blocked
```
**Solution:** Check CORS policy in `Program.cs`, ensure frontend URL is added

### JWT Error
```
Invalid token
```
**Solution:**
- Verify Jwt:Key is the same
- Check token expiration
- Validate token format (Bearer eyJ...)

### Database Connection Error
```
Unable to connect to database
```
**Solution:**
- Check connection string in `appsettings.json`
- Verify `movie.db` file permissions

## Deployment

### Azure App Service

```bash
dotnet publish -c Release
# Upload published files to Azure
```

### Docker

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "movieBackend.dll"]
```

Build and run:
```bash
docker build -t movie-app-backend .
docker run -p 5000:80 movie-app-backend
```

## Contributing

1. Create a branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**For questions and support, please open an issue on GitHub!**
