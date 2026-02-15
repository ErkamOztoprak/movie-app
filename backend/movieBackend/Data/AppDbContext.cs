using Microsoft.EntityFrameworkCore;
using movieBackend.Models;


namespace movieBackend.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users{get;set;}
        public DbSet<RefreshToken> RefreshTokens{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(u=>u.Email).IsUnique();
            modelBuilder.Entity<RefreshToken>().HasOne(r=>r.User).WithMany().HasForeignKey(r=>r.UserId);
        }
        
    
}
}