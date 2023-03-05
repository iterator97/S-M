
using Application.Core;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Dto;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.WorkTasks
{
    public class CreateDependency
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string WorkTaskId { get; set; }
            public string DependencyId { get; set; }
        }


        public class Handler : IRequest<Result<Unit>>
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
                var workTask = await _context.WorkTasks.FindAsync(request.WorkTaskId);

                var workTaskDependency = await _context.WorkTasks.FindAsync(request.DependencyId);


                if (workTask != null)
                {
                    return Result<Unit>.Failure("Failed to find work task");
                }


                return Result<Unit>.Success(Unit.Value);
            }

        }

    }
}
