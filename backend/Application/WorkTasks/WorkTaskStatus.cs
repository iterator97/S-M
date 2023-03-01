using Application.Core;
using Application.Dto;
using Application.Dto.WorkTask;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkTasks
{
    public class WorkTaskStatus
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ChangeStatusDto change { get; set; }
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

                var workTask = await _context.WorkTasks.FindAsync(new Guid(request.change.Id));

                if (workTask == null)
                {
                    return Result<Unit>.Failure("Failed to find work task");
                }

                if (request.change.Status != 3)
                {
                    workTask.Status = (Status)request.change.Status;
                }

                if (request.change.Status == 3)
                {
                    var dependencies = await _context.WorkTaskDependencies.Where(x => x.WorkTaskId.ToString() == request.change.Id).ToListAsync();

                    if (dependencies.Any())
                    {
                        foreach (var item in dependencies)
                        {

                            if (item.WorkTask.Status != Status.Done)
                            {
                                Result<Unit>.Failure("Nie można ukończyć zadania ponieważ zadanie zależne nie jest ukonczone");
                            }

                        }
                    }
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update work task");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
