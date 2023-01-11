using Domain;

namespace Persistence.Migrations
{
    public class Seed
    {
        public static async Task SeedUserData(DataContext context)
        {
            // Work Task 
            if (context.WorkTasks.Any()) return;

            var workTasks = new List<WorkTask>
            {
                new WorkTask
                {
                    Id = Guid.NewGuid(),
                    Content = "Sample content 1",
                    SubContent = "Sample subcontent 1",
                    Status = Status.NotDefinded
                },
                new WorkTask
                {
                    Id = Guid.NewGuid(),
                    Content = "Sample content 2",
                    SubContent = "Sample subcontent 2",
                    Status = Status.NotDefinded
                }
            };

            await context.WorkTasks.AddRangeAsync(workTasks);
            await context.SaveChangesAsync();
        }
    }
}
