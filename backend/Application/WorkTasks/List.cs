using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.WorkTasks
{
    public class List
    {
        public class Query : IRequest<List<WorkTask>>
        {

            public class Handler : IRequestHandler<Query, List<WorkTask>>
            {
                private readonly DataContext _context;

                public Handler(DataContext context)
                {
                    _context = context;
                }

                public async Task<List<WorkTask>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return await _context.WorkTasks.ToListAsync();
                }
            }

        }
    }
}
