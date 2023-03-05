
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
    public class Dependencies
    {
        public class Query : IRequest<Result<List<DependencyProfile>>>
        {
            public string WorkTaskId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<DependencyProfile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<DependencyProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var dependencies = await _context.WorkTaskDependencies.Include(a => a.WorkTask).Where(x => x.WorkTaskId.ToString() == request.WorkTaskId).ToListAsync();

                var depToReturn = mapper.Map<List<DependencyProfile>>(dependencies);

                if (depToReturn == null)
                {
                    return null;

                }

                foreach (var item in depToReturn)
                {
                    var dependencyWorkTask = await _context.WorkTasks.Where(x => x.Id.ToString() == item.WorkTaskDependencyId).FirstOrDefaultAsync();
                    if (dependencyWorkTask != null)
                    {
                        item.WorkTaskDependencyTitle = dependencyWorkTask.Content;
                    }
                }

                return Result<List<DependencyProfile>>.Success(depToReturn);

            }
        }

        ///////////////////////////
    }
}
