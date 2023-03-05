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
    public class RemoveDependency
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
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
                var dependency = await _context.WorkTaskDependencies.FindAsync(new Guid(request.Id));

                _context.Remove(dependency);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to remove dependency");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
