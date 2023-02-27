using Application.Core;
using Application.Dto;
using Application.Dto.Project;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProjectDto ProjectToEdit { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IMapper mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //var projectToEdit = await context.Projects.FirstOrDefaultAsync(x => x.Id.ToString() == request.ProjectToEdit.Id);

                var projectToEdit = await context.Projects.FindAsync(new Guid(request.ProjectToEdit.Id));

                var owner = await context.Users.FindAsync(request.ProjectToEdit.OwnerId);

                if (projectToEdit == null)
                {
                    return Result<Unit>.Failure("Failed to find owner");
                }

                if (request.ProjectToEdit.Name != null)
                {
                    projectToEdit.Name = request.ProjectToEdit.Name;
                }

                if (request.ProjectToEdit.Description != null)
                {
                    projectToEdit.Description = request.ProjectToEdit.Description;
                }

                // TODO -> rebuilt

                if (request.ProjectToEdit.StartDate != null)
                {
                    projectToEdit.StartDate = request.ProjectToEdit.StartDate;
                }

                if (request.ProjectToEdit.EndDate != null)
                {
                    projectToEdit.EndDate = request.ProjectToEdit.EndDate;
                }

                //// TODO -> rebuilt 
                context.Remove(projectToEdit);

                var result = await context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update project");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
