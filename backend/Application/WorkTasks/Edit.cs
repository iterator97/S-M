using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WorkTasks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public WorkTask workTask { get; set; }
        }

        public class Handler : IRequest<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var workTask = await _context.WorkTasks.FindAsync(request.workTask.Id);

                _mapper.Map(request.workTask, workTask);
        
                await _context.SaveChangesAsync();

                return Unit.Value;
            }

        }
    }
}
