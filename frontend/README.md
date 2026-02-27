# Movie App Frontend 🎬

Modern, responsive web application built with Angular 21 and Tailwind CSS. Provides user authentication, movie listing, and dynamic page management.

## Quick Start

```bash
cd movie-app/frontend
npm install
npm start
```

Frontend: `http://localhost:4200`

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure](#structure)
- [Development](#development)
- [Build and Deployment](#build-and-deployment)

## Features

🎨 **Modern UI**
- Responsive design (desktop, tablet, mobile)
- Fast styling with Tailwind CSS
- Angular Material components

🔐 **Authentication**
- User registration page
- Login system
- JWT-based authorization
- Token management

🎥 **Movie Management**
- Browse movie listings
- Search and filtering
- Responsive grid layout

📱 **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop experience

## Technology Stack

- **Framework**: Angular 21.1.3
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **CSS**: PostCSS, Autoprefixer
- **Build Tool**: Angular CLI + Vite
- **Http Client**: Angular HttpClientModule
- **State Management**: RxJS 7.8
- **Testing**: Jasmine & Karma
- **Routing**: Angular Router
- **Deployment**: Firebase Hosting

## Installation

### Requirements

- Node.js v18+
- npm v9+
- Git

### Steps

```bash
# Clone repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app/frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Configuration

### API Endpoint Configuration

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

### Tailwind CSS Configuration

`tailwind.config.cjs` is already configured.

### Angular Configuration

`angular.json` contains project settings.

## Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home-page/               # Home page
│   │   │   │   ├── home-page.ts
│   │   │   │   ├── home-page.html
│   │   │   │   └── home-page.css
│   │   │   ├── login-page/              # Login page
│   │   │   │   ├── login-page.ts
│   │   │   │   ├── login-page.html
│   │   │   │   └── login-page.css
│   │   │   ├── register-page/           # Registration page
│   │   │   │   ├── register-page.ts
│   │   │   │   ├── register-page.html
│   │   │   │   └── register-page.css
│   │   │   └── movie-list/              # Movie list
│   │   │       ├── movie-list.ts
│   │   │       ├── movie-list.html
│   │   │       └── movie-list.css
│   │   ├── services/
│   │   │   ├── movie.service.ts         # API communication
│   │   │   ├── auth.service.ts          # Authentication
│   │   │   └── *.spec.ts
│   │   ├── models/
│   │   │   └── movie.model.ts           # Data models
│   │   ├── app.component.ts             # Root component
│   │   ├── app.routes.ts                # Routing
│   │   └── app.component.html
│   ├── main.ts                          # Entry point
│   ├── index.html
│   └── styles.css                       # Global styles
├── angular.json                         # Angular CLI configuration
├── tailwind.config.cjs
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Development

### Development Server

```bash
npm start
```

Application auto-reloads on changes: `http://localhost:4200`

### Angular CLI Commands

```bash
# Generate new component
ng generate component components/my-component

# Generate new service
ng g service services/my-service

# Generate new module
ng g module modules/my-module

# Lint check
ng lint
```

## Components

### home-page

Home page component.

```typescript
export class HomePage implements OnInit {
  // Home page logic
}
```

### login-page

User login form.

```typescript
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  // Login logic
}
```

### register-page

User registration form.

```typescript
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  // Registration logic
}
```

### movie-list

Movie listing display.

```typescript
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  // Movie management
}
```

## Services

### MovieService

Fetch movie data from API.

```typescript
export class MovieService {
  getMovies(): Observable<Movie[]>
  getMovie(id: string): Observable<Movie>
  searchMovies(query: string): Observable<Movie[]>
}
```

### AuthService

User authentication and token management.

```typescript
export class AuthService {
  register(data: RegisterRequest): Observable<LoginResponse>
  login(data: LoginRequest): Observable<LoginResponse>
  logout(): Observable<void>
  refreshToken(): Observable<LoginResponse>
}
```

## Routing

`app.routes.ts` defines application routes:

```typescript
export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] }
];
```

## Form Management

Uses Reactive Forms:

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});
```

## HTTP Requests

API calls via HttpClient:

```typescript
this.http.post<LoginResponse>(
  `${this.apiUrl}/auth/login`,
  credentials
).pipe(
  catchError(error => this.handleError(error))
);
```

## Testing

### Unit Tests

```bash
npm test
```

Test files: `*.spec.ts`

### E2E Tests

```bash
npm run e2e
```

## Build and Deployment

### Production Build

```bash
npm run build
```

Output: `dist/movie-app/`

### Firebase Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy
firebase deploy
```

### Build Optimizations

- Tree-shaking
- Code splitting
- Minification
- AOT compilation

## Environment Variables

Create `.env` file:

```env
API_URL=http://localhost:5000
APP_NAME=Movie App
VERSION=1.0.0
```

## Styling

### Tailwind CSS Classes

```html
<div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
  <h1 class="text-2xl font-bold text-gray-900">Movie List</h1>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Add
  </button>
</div>
```

### Global Styles

Defined in `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
```

## Performance

### Best Practices

- Use OnPush change detection
- Manage RxJS subscriptions
- Implement lazy loading
- Optimize images
- Monitor bundle size

### Lighthouse Targets

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Troubleshooting

### CORS Error
```
Access to XMLHttpRequest blocked
```
**Solution:** Check backend CORS settings

### Module Not Found
```
Cannot find module '@angular/...'
```
**Solution:** Run `npm install`

### Build Error
```
NG6001: This declaration is not an Angular component
```
**Solution:** Declare component in NgModule or mark as standalone

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**For questions and support, please open an issue on GitHub!**
