using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<SubProject> SubProjects { get; set; }
    public DbSet<WorkTask> WorkTasks { get; set; }
    public DbSet<SubTask> SubTasks { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<ProjectAttendee> ProjectAttendees { get; set; }
    public DbSet<WorkTaskDependency> WorkTaskDependencies { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // START Project + SubProject => One to many
        builder.Entity<SubProject>()
            .HasOne(a => a.Project)
                .WithMany(b => b.SubProjects)
                    .HasForeignKey(c => c.ProjectId);

        // START Project + AppUser => Many to Many
        builder.Entity<ProjectAttendee>
            (x => x.HasKey(aa => new { aa.AppUserId, aa.ProjectId }));

        builder.Entity<ProjectAttendee>()
            .HasOne(u => u.AppUser)
                .WithMany(a => a.Projects)
                    .HasForeignKey(aa => aa.AppUserId);

        builder.Entity<ProjectAttendee>().
             HasOne(u => u.Project).
                WithMany(a => a.ProjectAttendees)
                    .HasForeignKey(aa => aa.ProjectId);

        // START SubSpace + WorkTask => One to many
        builder.Entity<WorkTask>()
            .HasOne(a => a.SubProject)
                .WithMany(b => b.SubProjectWorkTasks)
                    .HasForeignKey(b => b.SubProjectId);


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
