using System.ComponentModel.DataAnnotations;

public class LoginRequest
{
    
    public required string Email{get;set;}
    
    public required int Password{get;set;}
}