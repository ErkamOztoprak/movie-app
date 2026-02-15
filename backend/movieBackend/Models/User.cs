namespace movieBackend.Models
{
    public class User
    {    
        public int Id {get; set;}
        public required string Email{get; set;}
        public required string PasswordHash{get; set;}
        public required DateTime CreatedAt {get;set;}
        public DateTime? LastLogin{get;set;}
        public bool IsActive{get;set;}=true;
        public bool IsEmailVerified {get;set;}=false;
        public int FailedLoginAttempts{get;set;}=0;
        public DateTime? LockoutEndDate{get;set;} 



    }
    
}