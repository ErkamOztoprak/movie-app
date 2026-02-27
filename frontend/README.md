# Movie App Frontend 🎬

Angular 21 ve Tailwind CSS kullanılarak geliştirilen modern responsive web uygulaması. Kullanıcı kimlik doğrulama, film listesi ve dinamik sayfa yönetimi.

## Hızlı Başlangıç

```bash
cd movie-app/frontend
npm install
npm start
```

Frontend: `http://localhost:4200`

## İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Konfigürasyon](#konfigürasyon)
- [Yapı](#yapı)
- [Geliştirme](#geliştirme)
- [Build ve Deployment](#build-ve-deployment)

## Özellikler

🎨 **Modern Arayüz**
- Responsive tasarım (desktop, tablet, mobile)
- Tailwind CSS ile hızlı styling
- Angular Material bileşenleri

🔐 **Kimlik Doğrulama**
- Kullanıcı kayıt sayfası
- Giriş sistemi
- JWT tabanlı yetkilendirme
- Token yönetimi

🎥 **Film Yönetimi**
- Film listesi görüntüleme
- Arama ve filtreleme
- Responsive grid layout

📱 **Responsive Design**
- Mobile-first yaklaşım
- Tablet optimizasyonu
- Desktop deneyimi

## Teknoloji Stack

- **Framework**: Angular 21.1.3
- **Dil**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4
- **CSS**: PostCSS, Autoprefixer
- **Build Tool**: Angular CLI + Vite
- **Http Client**: Angular HttpClientModule
- **State Management**: RxJS 7.8
- **Testing**: Jasmine & Karma
- **Routing**: Angular Router
- **Deployment**: Firebase Hosting

## Kurulum

### Gereksinimler

- Node.js v18+
- npm v9+
- Git

### Adımlar

```bash
# Repository'i klonlayın
git clone https://github.com/yourusername/movie-app.git
cd movie-app/frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu çalıştırın
npm start
```

## Konfigürasyon

### API Endpoint Yapılandırması

`src/environments/environment.ts` dosyasını oluşturun:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

`src/environments/environment.prod.ts` dosyasını oluşturun:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com'
};
```

### Tailwind CSS Yapılandırması

`tailwind.config.cjs` zaten yapılandırılmıştır.

### Angular Configuration

`angular.json` dosyası proje ayarlarını içerir.

## Yapı

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home-page/               # Ana sayfa
│   │   │   │   ├── home-page.ts
│   │   │   │   ├── home-page.html
│   │   │   │   └── home-page.css
│   │   │   ├── login-page/              # Giriş sayfası
│   │   │   │   ├── login-page.ts
│   │   │   │   ├── login-page.html
│   │   │   │   └── login-page.css
│   │   │   ├── register-page/           # Kayıt sayfası
│   │   │   │   ├── register-page.ts
│   │   │   │   ├── register-page.html
│   │   │   │   └── register-page.css
│   │   │   └── movie-list/              # Film listesi
│   │   │       ├── movie-list.ts
│   │   │       ├── movie-list.html
│   │   │       └── movie-list.css
│   │   ├── services/
│   │   │   ├── movie.service.ts         # API iletişimi
│   │   │   ├── auth.service.ts          # Kimlik doğrulama
│   │   │   └── *.spec.ts
│   │   ├── models/
│   │   │   └── movie.model.ts           # Veri modelleri
│   │   ├── app.component.ts             # Kök bileşen
│   │   ├── app.routes.ts                # Yönlendirme
│   │   └── app.component.html
│   ├── main.ts                          # Giriş noktası
│   ├── index.html
│   └── styles.css                       # Global stiller
├── angular.json                         # Angular CLI yapılandırması
├── tailwind.config.cjs
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Geliştirme

### Development Sunucusu

```bash
npm start
```

Uygulama otomatik olarak yeniden yüklenir: `http://localhost:4200`

### Angular CLI Komutları

```bash
# Yeni bileşen oluştur
ng generate component components/my-component

# Yeni service oluştur
ng g service services/my-service

# Yeni module oluştur
ng g module modules/my-module

# Lint kontrol
ng lint
```

## Bileşenler

### home-page

Ana sayfa bileşeni.

```typescript
export class HomePage implements OnInit {
  // Tahmin ve film listesi mantığı
}
```

### login-page

Kullanıcı giriş formu.

```typescript
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  // Giriş mantığı
}
```

### register-page

Kullanıcı kayıt formu.

```typescript
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  // Kayıt mantığı
}
```

### movie-list

Film listesi görüntüleme.

```typescript
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]>;
  // Film yönetimi
}
```

## Services

### MovieService

Film verilerini API'dan getirir.

```typescript
export class MovieService {
  getMovies(): Observable<Movie[]>
  getMovie(id: string): Observable<Movie>
  searchMovies(query: string): Observable<Movie[]>
}
```

### AuthService

Kullanıcı kimlik doğrulaması ve token yönetimi.

```typescript
export class AuthService {
  register(data: RegisterRequest): Observable<LoginResponse>
  login(data: LoginRequest): Observable<LoginResponse>
  logout(): Observable<void>
  refreshToken(): Observable<LoginResponse>
}
```

## Routing

`app.routes.ts` dosyası yonlendirmeleri tanımlar:

```typescript
export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard] }
];
```

## Form Yönetimi

Reactive Forms kullanılır:

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});
```

## HTTP İstekleri

HttpClient ile API çağrıları:

```typescript
this.http.post<LoginResponse>(
  `${this.apiUrl}/auth/login`,
  credentials
).pipe(
  catchError(error => this.handleError(error))
);
```

## Testing

### Unit Testler

```bash
npm test
```

Test dosyaları: `*.spec.ts`

### E2E Testler

```bash
npm run e2e
```

## Build ve Deployment

### Production Build

```bash
npm run build
```

Output: `dist/movie-app/`

### Firebase Deployment

```bash
# Firebase CLI yükleyin
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Deploy edin
firebase deploy
```

### Build Optimizasyonları

- Tree-shaking
- Code splitting
- Minification
- AOT compilation

## Environment Değişkenleri

`.env` dosyası oluşturun:

```env
API_URL=http://localhost:5000
APP_NAME=Movie App
VERSION=1.0.0
```

## Styling

### Tailwind CSS Sınıfları

```html
<div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
  <h1 class="text-2xl font-bold text-gray-900">Film Listesi</h1>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Ekle
  </button>
</div>
```

### Global Stiller

`src/styles.css` dosyasında tanımlanır:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom stiller */
```

## Performans

### Best Practices

- OnPush change detection kullanın
- RxJS unsubscribe işlemini yönetin
- Lazy loading uygulayın
- Images optimizasyonu
- Bundle size kontrol

### Lighthouse Hedefler

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Sorun Giderme

### CORS Hatası
```
Access to XMLHttpRequest blocked
```
**Çözüm:** Backend CORS ayarlarını kontrol edin

### Module Bulunamadı
```
Cannot find module '@angular/...'
```
**Çözüm:** `npm install` çalıştırın

### Build Hatası
```
NG6001: This declaration is not an Angular component
```
**Çözüm:** Bileşeni NgModule'e veya standalone olarak tanımlayın

## Browser Uyumluluğu

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Katkıda Bulunma

1. Branch oluşturun (`git checkout -b feature/amazing-feature`)
2. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
3. Branch'ı push edin (`git push origin feature/amazing-feature`)
4. Pull Request açın

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

---

**Sorular ve Destek için GitHub Issues açın!**
