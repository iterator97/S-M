﻿using Application.Core;
using Azure.Core;
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
    public class Details
    {
        public class Query : IRequest<WorkTask>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, WorkTask>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<WorkTask> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.WorkTasks.FindAsync(request.Id);

               
            }
        }
    }
}
