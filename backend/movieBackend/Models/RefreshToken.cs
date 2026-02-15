using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

namespace movieBackend.Models
{
    public class RefreshToken
    {   
        [Key]
        public  int Id {get;set;}
        public int UserId {get;set;}
        public required string TokenHash {get; set;}
        public DateTime ExpiresAt{get;set;}
        public DateTime CreatedAt{get;set;}
        public DateTime? RevokedAt {get;set;}
        public User? User{get;set;}
    }
    
}