using Application.Core;
using Application.Dto;
using Application.Dto.WorkTask;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkTasks
{
    public class Test
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string WorkTaskId { get; set; }
            public string DependencyId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workTask = await _context.WorkTasks.FindAsync(new Guid(request.WorkTaskId));

                var workTaskDependency = await _context.WorkTasks.FindAsync(new Guid(request.DependencyId));

                WorkTaskDependency dependency = new WorkTaskDependency()
                {
                    WorkTask = workTask,
                    WorkTaskDependencyId = workTaskDependency.Id.ToString(),
                };

                _context.WorkTaskDependencies.Add(dependency);


                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update work task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
