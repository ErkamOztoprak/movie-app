using System.ComponentModel.DataAnnotations;

public class LoginResponse
{
    
    public required string AccesToken {get;set;}
    public required string RefreshToken {get;set;}

}