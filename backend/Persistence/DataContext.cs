using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<WorkTask> WorkTasks { get; set; }
    public DbSet<SubTask> SubTasks { get; set; }
}
