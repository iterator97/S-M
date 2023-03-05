
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
                    new AppUser{Id= "2759ca58-5b55-4ba2-bd05-47999bdb2b21", Name = "Jan", Surname = "Jowalski", UserName = "JanKowalski", Email = "jankowalski@gmail.com"},
                    new AppUser{Id= "d140ae51-a6ca-450f-9edc-502e16a37523", Name = "Piotr", Surname = "Kaliski", UserName = "PiotrKaliski", Email = "piotrkaliski@gmail.com"},
                    new AppUser{Id= "88d0863e-313a-4a35-82b1-278f1700fa36", Name = "Marek", Surname = "Zielinski", UserName = "MarekZielinski", Email = "marekzielinski@gmail.com"},
                };

            if (!userManager.Users.Any())
            {
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            // Projects 
            if (!context.Projects.Any())
            {
                var spaces = new List<Project>
            {
                new Project
                {
                    Id = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                    Name = "Project 1",
                    Description = "Simple descripton project 1",
                    StartDate= DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                    ProjectAttendees = new List<ProjectAttendee>
                    {
                        new ProjectAttendee
                        {
                            AppUser = users[0],
                            ProjectId = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                            IsOwner= true,
                        },
                        new ProjectAttendee
                        {
                            AppUser = users[1],
                            ProjectId = new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa"),
                            IsOwner= false,
                        }
                    }
                },
                new Project
                {
                    Id = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                    Name = "Project 2",
                    Description = "Simple descripton project 2",
                    EndDate = new DateTime(2023, 10, 20),
                    ProjectAttendees = new List<ProjectAttendee>
                    {
                        new ProjectAttendee
                        {
                            AppUser = users[0],
                            ProjectId = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                            IsOwner= true,
                        },
                        new ProjectAttendee
                        {
                            AppUser = users[1],
                            ProjectId = new Guid("6251dc47-695d-442d-8b54-fd62a213edf4"),
                            IsOwner= false,
                        }
                    }
                }
            };
                await context.Projects.AddRangeAsync(spaces);
            }

            // SubProjects 
            if (!context.SubProjects.Any())
            {
                var subSpaces = new List<SubProject>
            {
                // Space 1
                new SubProject
                {
                    Id = new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    Name = "SubSpace 1",
                    ProjectId= new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa")
                },
                new SubProject
                {
                    Id = new Guid("443104ee-b272-491b-826a-671d11078d77"),
                    Name = "SubSpace 2",
                    ProjectId= new Guid("c22485d3-29d7-4840-a9f3-46ff46b7fefa")
                },

                // Space 2
                new SubProject
                {
                    Id = new Guid("49e26afb-9f3a-4f26-aa95-a3b1155ba18d"),
                    Name = "SubSpace 3",
                    ProjectId= new Guid("6251dc47-695d-442d-8b54-fd62a213edf4")
                },
                new SubProject
                {
                    Id = new Guid("6291ef15-277c-4ada-9187-4bc5e3e91ced"),
                    Name = "SubSpace 4",
                    ProjectId= new Guid("6251dc47-695d-442d-8b54-fd62a213edf4")
                }

            };
                await context.SubProjects.AddRangeAsync(subSpaces);
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
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                    SubTasks = new List<SubTask>()
                    {
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 1",
                            IsDone= false,
                        },
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 2",
                            IsDone= false,
                        },
                    },
                    WorkTaskDependencyList= new List<WorkTaskDependency> {
                        new WorkTaskDependency
                        {
                            Id = new Guid(),
                            WorkTaskDependencyId = "a0d6fa6f-e5a1-4406-adf9-c73a86af5b92"
                        }
                    },
                },
                new WorkTask
                {
                    Id = new Guid("a0d6fa6f-e5a1-4406-adf9-c73a86af5b92"),
                    Content = "Sample content 2",
                    SubContent = "Sample subcontent 2",
                    Status = Status.NotDefinded,
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                    SubTasks = new List<SubTask>()
                    {
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 1",
                            IsDone= false,
                        },
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 2",
                            IsDone= false,
                        },
                    }
                },
                 new WorkTask
                {
                    Id = new Guid("add4e0e9-289b-4240-8228-9bcab8e0158b"),
                    Content = "Sample content 1",
                    SubContent = "Sample subcontent 1",
                    Status = Status.Assigned,
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                    SubTasks = new List<SubTask>()
                    {
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 1",
                            IsDone= false,
                        },
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 2",
                            IsDone= false,
                        },
                    }
                },
                new WorkTask
                {
                    Id = new Guid("b2d6fa6f-e5a1-4406-adf9-c73a86af5b92"),
                    Content = "Sample content 2",
                    SubContent = "Sample subcontent 2",
                    Status = Status.Done,
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                    SubTasks = new List<SubTask>()
                    {
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 1",
                            IsDone= false,
                        },
                        new SubTask
                        {
                            Id = new Guid(),
                            Description = "Sample subtask 2",
                            IsDone= false,
                        },
                    }
                },
                 new WorkTask
                {
                    Id = new Guid("cbd4e0e9-289b-4240-8338-9bcab8e0158b"),
                    Content = "Sample content 1",
                    SubContent = "Sample subcontent 1",
                    Status = Status.InProgress,
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                },
                new WorkTask
                {
                    Id = new Guid("cbd4e0e9-289b-5340-8338-9bcab8e0158b"),
                    Content = "Sample content 1",
                    AssignWorkerId = "2759ca58-5b55-4ba2-bd05-47999bdb2b21",
                    AssignWorker = users[0],
                    SubContent = "Sample subcontent 1",
                    Status = Status.NotDefinded,
                    SubProjectId= new Guid("78fe18b7-20f7-4883-a35a-c0f2ccbfb910"),
                    CreatedDate = DateTime.Now,
                    EndDate = new DateTime(2023, 10, 20),
                },

            };
                await context.WorkTasks.AddRangeAsync(workTasks);
            }

            await context.SaveChangesAsync();
        }
    }
}
