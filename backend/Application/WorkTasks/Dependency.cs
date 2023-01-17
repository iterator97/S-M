
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
    public class Dependency
    {
        public class Command : IRequest
        {
            public string WorkTaskId { get; set; }
            public List<string> Dependencies { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var workTask = await _context.WorkTasks.FindAsync(request.WorkTaskId, cancellationToken);

                // Przejdz po liscie 
                // Znajdz kazdy work task 
                // sprawdz czy w jego dependecies nei ma aktualnego workTaska
                foreach (var item in request.Dependencies)
                {

                }

                _context.Remove(workTask);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
