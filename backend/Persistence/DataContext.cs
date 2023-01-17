using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Space> Spaces { get; set; }
    public DbSet<SubSpace> SubSpaces { get; set; }
    public DbSet<WorkTask> WorkTasks { get; set; }
    public DbSet<SubTask> SubTasks { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<WorkTaskDependency> WorkTaskDependencies { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // START Space + SubSpace => One to many
        builder.Entity<SubSpace>()
            .HasOne(a => a.Space)
                .WithMany(b => b.SubSpaces)
                    .HasForeignKey(c => c.SpaceId);

        // START Space + AppUser => Many to Many
        builder.Entity<SpaceAttendee>
            (x => x.HasKey(aa => new { aa.AppUserId, aa.SpaceId }));

        builder.Entity<SpaceAttendee>()
            .HasOne(u => u.AppUser)
                .WithMany(a => a.Spaces)
                    .HasForeignKey(aa => aa.AppUserId);

        builder.Entity<SpaceAttendee>().
             HasOne(u => u.Space).
                WithMany(a => a.Attendees)
                    .HasForeignKey(aa => aa.SpaceId);

        // END Space + AppUser => Many to Many


        // START SubSpace + WorkTask => One to many
        builder.Entity<WorkTask>()
            .HasOne(a => a.SubSpace)
                .WithMany(b => b.SubSpaceTasks)
                    .HasForeignKey(b => b.SubSpaceId);

        // END SubSpace + WorkTask => One to many

        // START WorkTask + WorkTaskDependenc => One to many
        builder.Entity<WorkTaskDependency>()
            .HasOne(a => a.WorkTask)
                .WithMany(b => b.WorkTaskDependencyList)
                    .HasForeignKey(b => b.WorkTaskId);

        // END SubSpace + WorkTask => One to many

    }
}
