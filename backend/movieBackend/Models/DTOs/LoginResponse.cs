using System.ComponentModel.DataAnnotations;
namespace movieBackend.Models.DTOs;

public class LoginResponse
{
    
    public required string AccessToken {get;set;}
    public required string RefreshToken {get;set;}
    

}