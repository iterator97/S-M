using Domain;
using Domain.Identity;
using Domain.Spaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<WorkTask> WorkTasks { get; set; }
    public DbSet<SubTask> SubTasks { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<Space> Spaces { get; set; }
    public DbSet<SubSpace> SubSpaces { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // START Space + SubSpace => One to many
        builder.Entity<SubSpace>()
            .HasOne(a => a.Space)
                .WithMany(b => b.SubSpaces)
                    .HasForeignKey(c => c.SpaceId);
    }
}
