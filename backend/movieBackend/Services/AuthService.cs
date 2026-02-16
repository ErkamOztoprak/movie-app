using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.IdentityModel.Tokens;
using movieBackend.Data;
using movieBackend.Models;
using movieBackend.Services;
using BCrypt.Net;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using movieBackend.Models.DTOs;


public class AuthService: IAuthService
{
    
    private readonly AppDbContext _db;
    private readonly PasswordService _passwordService;
    private readonly IConfiguration _config;
    private readonly ILogger<AuthService> _logger;

    public AuthService(AppDbContext db, PasswordService passwordService, IConfiguration config, ILogger<AuthService> logger)
    {
        _db=db;
        _passwordService=passwordService;
        _config=config;
        _logger=logger;


    }
    public async Task<LoginResponse> Register(RegisterRequest request)
    {
        var existingUser=await _db.Users.FirstOrDefaultAsync(u=> u.Email==request.Email);
        if (existingUser != null)
        {
            throw new Exception("email zaten kullaniliyor");
        }

        var passwordHash=_passwordService.HashPassword(request.Password);

        var newUser=new User
        {
            Email=request.Email,
            PasswordHash=passwordHash,
            CreatedAt=DateTime.UtcNow,
            IsActive=true

        };

        _db.Users.Add(newUser);

        var accesToken =GenerateAccessToken(newUser);
        var refreshToken=GenerateRefreshToken();
        var tokenHash = BCrypt.Net.BCrypt.HashPassword(refreshToken);

        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId=newUser.Id,
            TokenHash=tokenHash,
            CreatedAt=DateTime.UtcNow,
            ExpiresAt=DateTime.UtcNow.AddDays(7)
        });
        await _db.SaveChangesAsync();

        return new LoginResponse{
            AccessToken=accesToken,
            RefreshToken=refreshToken
        };
        
        
    }
    private string GenerateAccessToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email,user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds =new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

        var token=new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience:_config["Jwt:Audience"],
            claims:claims,
            expires:DateTime.UtcNow.AddMinutes(15),
            signingCredentials:creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    private string GenerateRefreshToken()
    {
        var randomBytes=new byte[32];
        using var rng=RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }
    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u=>u.Email==request.Email);
        if (user == null)
        {
            throw new Exception("Email veya sifre hatali");
        }

        if(user.LockoutEndDate.HasValue && user.LockoutEndDate > DateTime.UtcNow)
        {
            throw new Exception("Hesap gecici olarak kilitli. Lutfen daha sonra tekrar deneyin");
        }

        var isPasswordValid= _passwordService.VerifyPassword(request.Password,user.PasswordHash);

        if (!isPasswordValid)
        {
            user.FailedLoginAttempts++;

            if (user.FailedLoginAttempts >= 5)
            {
                user.LockoutEndDate=DateTime.UtcNow.AddMinutes(15);
            }
            await _db.SaveChangesAsync();
            throw new Exception("Email veya sifre hatali");
        }

        user.FailedLoginAttempts=0;
        user.LockoutEndDate=null;
        user.LastLogin=DateTime.UtcNow;

        var accessToken=GenerateAccessToken(user);
        var refreshToken=GenerateRefreshToken();

        var tokenHash=BCrypt.Net.BCrypt.HashPassword(refreshToken);
        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId=user.Id,
            TokenHash=tokenHash,
            CreatedAt=DateTime.UtcNow,
            ExpiresAt=DateTime.UtcNow.AddDays(7)
        });

        await _db.SaveChangesAsync();

        return new LoginResponse
        {
            AccessToken=accessToken,
            RefreshToken=refreshToken
        };
    }
    public async Task<LoginResponse> Refresh(RefreshRequest request)
    {
        var storedToken =await _db.RefreshTokens
        .Include(rt=>rt.User)
        .FirstOrDefaultAsync(rt=>BCrypt.Net.BCrypt.Verify(request.RefreshToken,rt.TokenHash));

        if (storedToken == null)
        {
            throw new Exception("Gecersiz refresh token");
        }

        if (storedToken.ExpiresAt < DateTime.UtcNow)
        {
            throw new Exception("Refresh token suresi dolmus");
        }
        if (storedToken.RevokedAt.HasValue)
        {
            throw new Exception("Refresh token iptal edilmis");
        }
        storedToken.RevokedAt=DateTime.UtcNow;

        var newAccessToken=GenerateAccessToken(storedToken.User);
        var newRefreshToken=GenerateRefreshToken();

        var newTokenHash=BCrypt.Net.BCrypt.HashPassword(newRefreshToken);
        _db.RefreshTokens.Add(new RefreshToken
        {
            UserId=storedToken.UserId,
            TokenHash=newTokenHash,
            CreatedAt=DateTime.UtcNow,
            ExpiresAt=DateTime.UtcNow.AddDays(7)
        });
        await _db.SaveChangesAsync();

        return new LoginResponse
        {
            AccessToken=newAccessToken,
            RefreshToken=newRefreshToken
        };
    }

    public async Task Logout(int userId, string refreshToken)
    {
        var storedToken = await _db.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.UserId == userId && BCrypt.Net.BCrypt.Verify(refreshToken, rt.TokenHash));

        if (storedToken != null)
        {
            storedToken.RevokedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }
    }
}