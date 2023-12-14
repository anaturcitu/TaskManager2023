using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAppProject.Models.Entities;

namespace WebAppProject.Data
{
    public class MyDbContext: IdentityDbContext <IdentityUser>
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }

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
