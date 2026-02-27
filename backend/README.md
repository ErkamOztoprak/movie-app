# Movie App Backend 🎬

ASP.NET Core 10 tabanlı RESTful API uygulaması. JWT tabanlı kimlik doğrulama, SQLite veritabanı ve Entity Framework Core kullanarak film uygulaması için backend hizmetleri sağlar.

## Hızlı Başlangıç

```bash
cd movie-app/backend/movieBackend
dotnet restore
dotnet run
```

Backend: `https://localhost:5001`

## İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Konfigürasyon](#konfigürasyon)
- [API Endpoints](#api-endpoints)
- [Veritabanı](#veritabanı)
- [Geliştirme](#geliştirme)

## Özellikler

✨ **Kimlik Doğrulama**
- Kayıt ve giriş sistemi
- JWT token tabanlı yetkilendirme
- Token yenileme mekanizması
- Güvenli çıkış

🔐 **Güvenlik**
- BCrypt şifre şifrelemesi
- JWT token validasyonu
- CORS koruması
- Secure token mekanizması

## Teknoloji Stack

- **Framework**: ASP.NET Core 10
- **Dil**: C#
- **Veritabanı**: SQLite
- **ORM**: Entity Framework Core 10
- **Kimlik Doğrulama**: JWT Bearer Tokens
- **Şifreleme**: BCrypt.Net-Next 4.0.3

## Kurulum

### Gereksinimler

- .NET SDK 10 veya üstü
- Visual Studio veya VS Code

### Adımlar

```bash
# Repository'i klonlayın
git clone https://github.com/yourusername/movie-app.git
cd movie-app/backend/movieBackend

# Bağımlılıkları yükleyin
dotnet restore

# Uygulamayı çalıştırın
dotnet run
```

## Konfigürasyon

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

### CORS Ayarları

`Program.cs` içinde frontend URL'si eklenmiştir:

```csharp
policy.WithOrigins(
    "http://localhost:4200",
    "https://movie-app-f632f.web.app/"
).AllowAnyHeader().AllowAnyMethod().AllowCredentials()
```

## API Endpoints

### 🔓 Kimlik Doğrulama (Açık Endpoint)

| Method | Endpoint | Açıklama |
|--------|----------|---------|
| POST | `/auth/register` | Yeni kullanıcı kaydı |
| POST | `/auth/login` | Kullanıcı girişi |
| POST | `/auth/refresh` | Token yenileme |

### 🔐 Kimlik Doğrulama (Korumalı Endpoint)

| Method | Endpoint | Açıklama |
|--------|----------|---------|
| POST | `/auth/logout` | Kullanıcı çıkışı |

## İstek/Yanıt Örnekleri

### Kayıt (Register)

**İstek:**
```json
POST /auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Başarılı Yanıt (200):**
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

### Giriş (Login)

**İstek:**
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Başarılı Yanıt (200):**
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

### Token Yenileme (Refresh)

**İstek:**
```json
POST /auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Başarılı Yanıt (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

### Çıkış (Logout)

**İstek:**
```json
POST /auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Başarılı Yanıt (200):**
```json
{
  "message": "Logged out successfully"
}
```

## Hata Kodları

| Kod | Açıklama |
|-----|---------|
| 200 | Başarılı işlem |
| 400 | Hatalı istek |
| 401 | Yetkilendirilemedi |
| 403 | Yasaklandı |
| 404 | Bulunamadı |
| 500 | Server hatası |

## Veritabanı

### Şema

**Users Tablosu:**
- Id (GUID)
- Username (string, unique)
- Email (string, unique)
- PasswordHash (string)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)

**RefreshTokens Tablosu:**
- Id (GUID)
- UserId (GUID, foreign key)
- Token (string)
- ExpiryDate (DateTime)
- IsRevoked (bool)
- CreatedAt (DateTime)

### Veritabanı Oluşturma

```bash
# Migrations uygulamak için
dotnet ef database update

# Veritabanını sıfırlamak için
dotnet ef database drop
dotnet ef database update
```

## Geliştirme

### Proje Yapısı

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
│   ├── AuthService.cs               # İş mantığı
│   ├── IAuthService.cs              # Arayüz
│   └── PasswordService.cs            # Şifre hizmetleri
├── Program.cs                        # Uygulama yapılandırması
└── movieBackend.csproj
```

### Çalıştırma

**Debug Modu:**
```bash
dotnet run
```

**Release Modu:**
```bash
dotnet run --configuration Release
```

**Watch Modu (dosya değişikliklerinde otomatik yeniden başla):**
```bash
dotnet watch run
```

### Production Build

```bash
dotnet publish -c Release -o ./publish
```

### Logging ve Debugging

API çağrılarını test etmek için `movieBackend.http` dosyasını kullanın:

```bash
# movieBackend.http dosyasında tanımlı istekleri çalıştırın
```

## Güvenlik Best Practices

✅ **Uygulanmış:**
- JWT token validasyonu
- BCrypt şifre şifrelemesi
- CORS koruması
- Refresh token mekanizması

⚠️ **Öneriler:**
- Production'da güçlü secret key kullanın
- HTTPS zorunlu hale getirin
- Rate limiting ekleyin
- Token expiration sürelerini kısaltın
- Sensitive logları devre dışı bırakın

## Sorun Giderme

### CORS Hatası
```
Access to XMLHttpRequest blocked
```
**Çözüm:** `Program.cs` içindeki CORS policy'i kontrol edin, frontend URL'si eklenmiş mi?

### JWT Hatası
```
Invalid token
```
**Çözüm:** 
- Jwt:Key'in aynı olduğunu kontrol edin
- Token expiration süresi kontrol edin
- Token format kontrolü (Bearer eyJ...)

### Veritabanı Bağlantı Hatası
```
Unable to connect to database
```
**Çözüm:**
- `appsettings.json` içindeki connection string kontrolü
- `movie.db` dosyasının izinlerini kontrol edin

## Deployment

### Azure App Service

```bash
dotnet publish -c Release
# Publish edilen dosyaları Azure'a upload edin
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

Build ve çalıştır:
```bash
docker build -t movie-app-backend .
docker run -p 5000:80 movie-app-backend
```

## Katkıda Bulunma

1. Branch oluşturun (`git checkout -b feature/amazing-feature`)
2. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
3. Branch'ı push edin (`git push origin feature/amazing-feature`)
4. Pull Request açın

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

---

**Sorular ve Destek için GitHub Issues açın!**
