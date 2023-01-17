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

        // START SubSpace + WorkTask => One to many
        builder.Entity<WorkTask>()
            .HasOne(a => a.SubSpace)
                .WithMany(b => b.SubSpaceTasks)
                    .HasForeignKey(b => b.SubSpaceId);


        // START WorkTask + WorkTaskDependenc => One to many
        builder.Entity<WorkTaskDependency>()
            .HasOne(a => a.WorkTask)
                .WithMany(b => b.WorkTaskDependencyList)
                    .HasForeignKey(b => b.WorkTaskId);


        // START WorkTask + SubTask => One to many
        builder.Entity<SubTask>()
            .HasOne(a => a.WorkTask)
                .WithMany(b => b.SubTasks)
                    .HasForeignKey(b => b.WorkTaskId);

        builder.Entity<WorkTask>()
            .HasOne(p => p.AssignWorker)
                .WithMany(b => b.AssignedTasks)
                    .HasForeignKey(b => b.AssignWorkerId);

    }
}
