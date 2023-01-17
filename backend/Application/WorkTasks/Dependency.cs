
using Application.Core;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WorkTasks
{
    public class Dependency
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string WorkTaskId { get; set; }
            public List<string> Dependencies { get; set; }
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

                var workTask = await _context.WorkTasks.FindAsync(request.WorkTaskId, cancellationToken);

                if (workTask == null)
                {
                    return null;
                }


                var workTasks = _context.WorkTasks;

                foreach (var item in workTasks)
                {
                    foreach (var key in request.Dependencies)
                    {
                        if (new Guid(key) == item.Id)
                        {
                            foreach (var itemToCheck in item.WorkTaskDependencyList)
                            {
                                if (itemToCheck.WorkTaskId == new Guid(key))
                                {
                                    return Result<Unit>.Failure("Nie można dodać ponieważ to zadanie jest zależne od zadnia z id:" + itemToCheck.WorkTaskId);
                                }
                            }
                        }
                    }
                }

                var newDepList = new List<WorkTaskDependency>() { };

                foreach (var item in request.Dependencies)
                {
                    var newDep = new WorkTaskDependency()
                    {
                        DependencyId = item,
                        WorkTask = workTask,
                    };
                    newDepList.Add(newDep);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add dependency");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
