using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.WorkTasks
{
    public class Details
    {
        public class Query : IRequest<Result<WorkTask>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkTask>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<WorkTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.WorkTasks.FindAsync(request.Id);

                if (activity == null) { return null; }

                return Result<WorkTask>.Success(activity);

            }
        }
    }
}
