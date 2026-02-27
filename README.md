# Movie App 🎬

A full-stack web application for discovering and managing movies with user authentication. Built with Angular for the frontend and ASP.NET Core for the backend, featuring JWT-based authentication and real-time data management.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

✨ **User Authentication**
- User registration with secure password hashing (BCrypt)
- JWT-based login system
- Token refresh mechanism for session management
- Secure logout functionality

🎥 **Movie Management**
- Browse movie listings
- Search and filter movies
- Responsive design with Tailwind CSS

🔐 **Security**
- JWT token validation
- CORS protection
- Password encryption
- Secure token-based authentication

## Project Structure

```
2_angular_app/
├── movie-app/
│   ├── backend/
│   │   └── movieBackend/
│   │       ├── Data/
│   │       │   └── AppDbContext.cs          # Entity Framework context
│   │       ├── Models/
│   │       │   ├── User.cs
│   │       │   ├── RefreshToken.cs
│   │       │   └── DTOs/                    # Data transfer objects
│   │       ├── Services/
│   │       │   ├── AuthService.cs
│   │       │   ├── PasswordService.cs
│   │       │   └── IAuthService.cs
│   │       ├── Program.cs                   # Application configuration
│   │       └── movieBackend.csproj
│   │
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── home-page/               # Home page component
│       │   │   ├── login-page/              # Login component
│       │   │   ├── register-page/           # Registration component
│       │   │   ├── movie-list/              # Movie list component
│       │   │   ├── services/
│       │   │   │   └── movie.service.ts     # API communication service
│       │   │   ├── app.routes.ts            # Application routing
│       │   │   └── movie.model.ts           # Movie data model
│       │   ├── main.ts
│       │   ├── index.html
│       │   └── styles.css
│       ├── angular.json                     # Angular CLI configuration
│       ├── tailwind.config.cjs              # Tailwind CSS configuration
│       ├── package.json
│       └── tsconfig.json
│
└── 2_angular_app.sln                        # Visual Studio solution file
```

## Technology Stack

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Angular CLI with Vite
- **Http Client**: Angular HttpClientModule
- **State Management**: RxJS 7.8
- **Testing**: Jasmine & Karma

### Backend
- **Framework**: ASP.NET Core 10
- **Language**: C#
- **Database**: SQLite with Entity Framework Core 10
- **Authentication**: JWT Bearer Tokens
- **Security**: BCrypt password hashing
- **ORM**: Entity Framework Core
- **API**: RESTful API with minimal APIs

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **.NET SDK 10** or higher
- **Visual Studio** or **Visual Studio Code**
- **Git**

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/movie-app.git
cd 2_angular_app
```

### Backend Setup

```bash
cd movie-app/backend/movieBackend

# Restore NuGet packages
dotnet restore

# Apply database migrations (if needed)
dotnet ef database update

# Build the backend
dotnet build
```

### Frontend Setup

```bash
cd movie-app/frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
```

## Configuration

### Backend Configuration

Edit `movie-app/backend/movieBackend/appsettings.json`:

```json
{
  "Jwt": {
    "Key": "your-secret-key-min-32-characters",
    "Issuer": "your-issuer",
    "Audience": "your-audience"
  },
  "ConnectionStrings": {
    "DefaultConnection": "DataSource=movie.db"
  }
}
```

For development, use `appsettings.Development.json`:

```json
{
  "Jwt": {
    "Key": "dev-secret-key-min-32-characters",
    "Issuer": "localhost",
    "Audience": "localhost"
  }
}
```

### Frontend Configuration

The frontend is configured to communicate with the backend at:
- Development: `http://localhost:5000` (adjust in environment files as needed)
- Production: Your deployed backend URL

## Running the Application

### Start the Backend

```bash
cd movie-app/backend/movieBackend
dotnet run
```

The backend will start at `https://localhost:5001` or `http://localhost:5000`

### Start the Frontend

In a new terminal:

```bash
cd movie-app/frontend
npm start
```

The frontend will start at `http://localhost:4200`

### Access the Application

Open your browser and navigate to:
```
http://localhost:4200
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/logout` | User logout | ✅ |
| POST | `/auth/refresh` | Refresh JWT token | ❌ |

### Request/Response Examples

**Register:**
```json
POST /auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Login:**
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

Response:
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "user-id",
    "username": "john_doe"
  }
}
```

## Development

### Building for Production

**Frontend:**
```bash
cd movie-app/frontend
npm run build
```

The build output will be in the `dist/` directory.

**Backend:**
```bash
cd movie-app/backend/movieBackend
dotnet publish -c Release
```

### Running Tests

**Frontend Tests:**
```bash
cd movie-app/frontend
npm test
```

**Backend Tests:**
(Test project setup as needed)

### Database

The application uses SQLite with Entity Framework Core. The database file (`movie.db`) will be created automatically on first run.

To reset the database:
```bash
# Delete the existing database
rm movie-app/backend/movieBackend/movie.db

# Restart the application to recreate it
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow C# and TypeScript conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure tests pass before submitting PR

## Deployment

### Frontend Deployment (Firebase)

The project includes Firebase configuration for hosting:

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

### Backend Deployment

Deploy to your preferred hosting platform:
- Azure App Service
- AWS Elastic Beanstalk
- DigitalOcean
- Heroku
- Self-hosted server

Update the frontend API URL in environment configuration after deployment.

## Troubleshooting

### CORS Issues
- Ensure backend CORS policy includes frontend URL
- Check `AllowFrontend` policy in `Program.cs`

### Authentication Failures
- Verify JWT secrets match between frontend and backend
- Check token expiration times
- Clear browser cache and localStorage

### Database Connection Issues
- Ensure SQLite is properly installed
- Check file permissions on `movie.db`
- Verify connection string in `appsettings.json`

## Performance Tips

- Enable gzip compression on backend
- Implement lazy loading for movie lists
- Cache API responses in frontend
- Use production builds for deployment

## Security Best Practices

- Never commit sensitive data (API keys, secrets) to version control
- Use environment variables for configuration
- Rotate JWT secrets regularly
- Implement rate limiting on authentication endpoints
- Use HTTPS in production
- Validate all user inputs on backend

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, issues, or questions:
- Open an issue on GitHub
- Contact the development team

---

**Made with ❤️ by the Development Team**
