using Domain;
using Domain.Identity;
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

}
