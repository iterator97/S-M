using Application.Core;
using Application.Dto.Project;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateProjectDto NewProject { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var owner = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());
                var id = new Guid();

                if (owner == null)
                {
                    return Result<Unit>.Failure("Failed to find owner");
                }

                List<SubProject> subProjects = new List<SubProject>();

                foreach (var item in request.NewProject.SubProjects)
                {
                    SubProject newSubProject = new SubProject()
                    {
                        Id = new Guid(),
                        Name = item.Name,
                    };
                    subProjects.Add(newSubProject);
                }

                Project newProject = new Project()
                {
                    Id = id,
                    Name = request.NewProject.Name,
                    Description = request.NewProject.Description,
                    StartDate = request.NewProject.StartDate,
                    EndDate = request.NewProject.EndDate,
                    ProjectAttendees = new List<ProjectAttendee>()
                    {
                        new ProjectAttendee()
                        {
                            AppUserId = owner.Id,
                            AppUser = owner,
                            ProjectId= id,
                            IsOwner= true,
                        }
                    },
                    SubProjects = subProjects
                };

                context.Projects.Add(newProject);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create new project");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
