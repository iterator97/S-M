
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            var users = new List<AppUser>
                {
                    new AppUser{Id= "2759ca58-5b55-4ba2-bd05-47999bdb2b21", Surname = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{Id= "d140ae51-a6ca-450f-9edc-502e16a37523", Surname = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{Id= "88d0863e-313a-4a35-82b1-278f1700fa36", Surname = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

            if (!userManager.Users.Any())
            {
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            // Space 
            if (!context.Spaces.Any())
            {
                var spaces = new List<Space>
            {
                new Space
                {
                    Id = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                    Name = "Space 1",
                    Attendees = new List<SpaceAttendee>
                    {
                        new SpaceAttendee
                        {
                            AppUser = users[0],
                            SpaceId = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                            IsOwner= true,
                        },
                        new SpaceAttendee
                        {
                            AppUser = users[1],
                            SpaceId = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                            IsOwner= false,
                        }
                    }
                },
                new Space
                {
                    Id = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                    Name = "Space 2",
                    Attendees = new List<SpaceAttendee>
                    {
                        new SpaceAttendee
                        {
                            AppUser = users[0],
                            SpaceId = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                            IsOwner= true,
                        },
                        new SpaceAttendee
                        {
                            AppUser = users[1],
                            SpaceId = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                            IsOwner= false,
                        }
                    }
                }
            };
                await context.Spaces.AddRangeAsync(spaces);
            }

            // SubSpaces 
            if (!context.SubSpaces.Any())
            {
                var subSpaces = new List<SubSpace>
            {
                // Space 1
                new SubSpace
                {
                    Id = new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    Name = "SubSpace 1",
                    SpaceId= new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa")
                },
                new SubSpace
                {
                    Id = new Guid("443104ee-b272-491b-826a-671d11078d77"),
                    Name = "SubSpace 2",
                    SpaceId= new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa")
                },

                // Space 2
                new SubSpace
                {
                    Id = new Guid("49e26afb-9f3a-4f26-aa95-a3b1155ba18d"),
                    Name = "SubSpace 3",
                    SpaceId= new Guid("6251dc47-695d-442d-8b54-fd62a213edf4")
                },
                new SubSpace
                {
                    Id = new Guid("6291ef15-277c-4ada-9187-4bc5e3e91ced"),
                    Name = "SubSpace 4",
                    SpaceId= new Guid("6251dc47-695d-442d-8b54-fd62a213edf4")
                }

            };
                await context.SubSpaces.AddRangeAsync(subSpaces);
            }

            // Work Task 
            if (!context.WorkTasks.Any())
            {
                var workTasks = new List<WorkTask>
            {
                new WorkTask
                {
                    Id = new Guid("cbd4e0e9-289b-4240-8228-9bcab8e0158b"),
                    Content = "Sample content 1",
                    SubContent = "Sample subcontent 1",
                    Status = Status.NotDefinded,
                    SubSpaceId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910")
                },
                new WorkTask
                {
                    Id = new Guid("a0d6fa6f-e5a1-4406-adf9-c73a86af5b92"),
                    Content = "Sample content 2",
                    SubContent = "Sample subcontent 2",
                    Status = Status.NotDefinded,
                    SubSpaceId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910")
                }
            };
                await context.WorkTasks.AddRangeAsync(workTasks);
            }

            await context.SaveChangesAsync();
        }
    }
}
