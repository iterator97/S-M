
using Domain;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{Surname = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{Surname = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{Surname = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


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
