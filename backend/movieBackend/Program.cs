using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using movieBackend.Data;
using movieBackend.Services;
using SQLitePCL;
using movieBackend.Models.DTOs;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options=>options.UseSqlite("DataSource=movie.db "));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters=new TokenValidationParameters
    {
        ValidateIssuer=true,
        ValidateAudience=true,
        ValidateLifetime=true,
        ValidateIssuerSigningKey=true,
        ValidIssuer=builder.Configuration["Jwt:Issuer"],
        ValidAudience=builder.Configuration["Jwt:Audience"],
        IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))

    };
});
builder.Services.AddAuthorization();
builder.Services.AddCors(
    options=>options.AddPolicy("AllowFrontend",
    policy=>policy.WithOrigins("http://localhost:4200","https://movie-app-f632f.web.app/").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

builder.Services.AddScoped<PasswordService>();
builder.Services.AddScoped<IAuthService,AuthService>();    
var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var db=scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/auth/register",async(RegisterRequest request,IAuthService authservice)=>
{
    try
    {
        var response=await authservice.Register(request);
        return Results.Ok(response);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(new{error=ex.Message});
    }
});

app.MapPost("/auth/login",async(LoginRequest request,IAuthService authservice) =>
{
    try
    {
        var response=await authservice.Login(request);
        return Results.Ok(response);

    }
    catch(Exception ex)
    {
        return Results.BadRequest(new{error=ex.Message});
    }
});

app.MapPost("/auth/refresh",async(RefreshRequest request,IAuthService authservice) =>
{
    try
    {
        var response=await authservice.Refresh(request);
        return Results.Ok(response);
    }
    catch(Exception ex)
    {
        return Results.BadRequest(new{error=ex.Message});
    }
});

app.MapPost("/auth/logout",async(LogoutRequest request,IAuthService authservice,HttpContext context) =>
{
    try
    {
        var userId=int.Parse(context.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
        await authservice.Logout(userId,request.RefreshToken);
        return Results.NoContent();
    }
    catch(Exception ex)
    {
        return Results.BadRequest(new {error=ex.Message});
    }
}).RequireAuthorization();
app.Run();

