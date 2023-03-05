
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
    public class OtherDependencies
    {
        public class Query : IRequest<Result<List<WorkTaskProfile>>>
        {
            public string SubProjectId { get; set; }
            public string WorkTaskId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<WorkTaskProfile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<WorkTaskProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.SubProjects
                    .Where(x => x.Id.ToString() == request.SubProjectId)
                        .Include(b => b.SubProjectWorkTasks)
                          .FirstOrDefaultAsync(cancellationToken);


                var workTaskDependencies = await _context.WorkTaskDependencies.Include(a => a.WorkTask).Where(x => x.WorkTaskId.ToString() == request.WorkTaskId).ToListAsync();

                List<WorkTask> workTasksToReturn = new List<WorkTask>();

                foreach (var item in project.SubProjectWorkTasks)
                {
                    if (item.Id.ToString() != request.WorkTaskId.ToString())
                    {

                        bool isIn = true;
                        foreach (var item2 in workTaskDependencies)
                        {
                            if (item2.WorkTaskDependencyId.ToString() == item.Id.ToString())
                            {
                                isIn = false;
                            }
                        }
                        if (isIn)
                        {
                            workTasksToReturn.Add(item);
                        }

                    }
                }

                var depToReturn = mapper.Map<List<WorkTaskProfile>>(workTasksToReturn);

                return Result<List<WorkTaskProfile>>.Success(depToReturn);



            }
        }
    }
}
