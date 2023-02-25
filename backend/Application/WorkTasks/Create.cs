using Application.Core;
using Application.DTO;
using Domain;
using MediatR;
using Persistence;

namespace Application.WorkTasks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateWorkTaskDto WorkTask { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var subSpace = await _context.SubProjects.FindAsync(request.WorkTask.SubSpaceId);

                if (subSpace == null) { return null; }

                List<SubTask> subTasks = new List<SubTask>();

                foreach (var item in request.WorkTask.SubTasks)
                {
                    if (item != null)
                    {
                        var subTask = new SubTask()
                        {
                            Id = new Guid(),
                            Description = item.Description,

                        };
                        subTasks.Add(subTask);
                    }
                }

                WorkTask newWorkTask = new WorkTask()
                {
                    Id = new Guid(),
                    Content = request.WorkTask.Content,
                    SubContent = request.WorkTask.SubContent,
                    Status = Status.NotDefinded,
                    SubProject = subSpace,
                    WorkTaskDependencyList = new List<WorkTaskDependency>() { },
                    CreatedDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow,
                    IsDoneOnTime = false,
                    SubTasks = subTasks,
                };

                _context.WorkTasks.Add(newWorkTask);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create work task");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
