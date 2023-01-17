
using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WorkTasks
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var subTasks = _context.SubTasks;

                foreach (var item in subTasks)
                {
                    if (item.WorkTaskId == request.Id)
                    {
                        _context.SubTasks.Remove(item);
                    }
                }

                var res = await _context.SaveChangesAsync() > 0;

                var workTask = await _context.WorkTasks.FindAsync(request.Id, cancellationToken);

                if (workTask == null)
                {
                    return null;
                }

                _context.Remove(workTask);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete work task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
