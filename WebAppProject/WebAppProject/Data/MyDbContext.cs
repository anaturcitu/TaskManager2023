using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebAppProject.Data
{
    public class MyDbContext: IdentityDbContext <IdentityUser>
    {
        public MyDbContext(DbContextOptions<MyDbContext> dbContextOptions): base(dbContextOptions) { // constructor

        }

        protected override void OnModelCreating(ModelBuilder builder) // metoda care se apeleaza la crearea bazei de date
        {
            base.OnModelCreating(builder);
            createRoles(builder);
        }

        private static void createRoles(ModelBuilder modelBuilder) // creare roluri odata cu crearea bazei de date
        {
            modelBuilder.Entity<IdentityRole>().HasData(
                    new IdentityRole() { Name = "User", ConcurrencyStamp = "1", NormalizedName = "User" },
                    new IdentityRole() { Name = "Admin", ConcurrencyStamp = "2", NormalizedName = "Admin" }
                ) ;
        }
    }
}
