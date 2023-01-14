﻿using Domain;
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
    }
}
