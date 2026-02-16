namespace movieBackend.Models.DTOs;

public interface IAuthService
{
    Task<LoginResponse> Register(RegisterRequest request);
    Task<LoginResponse> Login(LoginRequest request);
    Task<LoginResponse> Refresh(RefreshRequest request);
    Task Logout(int userId, string refreshToken);
}

    
