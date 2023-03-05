
using Application.Core;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Dto;
using Application.Profiles;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkTasks
{
    public class Details
    {
        public class Query : IRequest<Result<WorkTaskProfile>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<WorkTaskProfile>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<WorkTaskProfile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var workTask = await _context.WorkTasks.Include(a => a.AssignWorker).Include(a => a.SubTasks).Where(x => x.Id.ToString() == request.Id).FirstOrDefaultAsync();

                var test = 1;
                if (workTask == null)
                {
                    return Result<WorkTaskProfile>.Failure("Failed to find work task");
                }

                var result = mapper.Map<WorkTaskProfile>(workTask);

                return Result<WorkTaskProfile>.Success(result);

            }
        }
    }
}
