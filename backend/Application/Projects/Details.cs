﻿using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Result<List<ProjectProfile>>>
        {
            public string ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProjectProfile>>>
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

            public async Task<Result<List<ProjectProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var projects = await context.Projects
                    .Where(x => x.Id.ToString() == request.ProjectId)
                    .Include(b => b.SubProjects)
                        .Include(c => c.ProjectAttendees)
                            .ThenInclude(d => d.AppUser)
                                .ToListAsync(cancellationToken);

                List<Project> result = new List<Project>();

                foreach (var space in projects)
                {
                    foreach (var att in space.ProjectAttendees)
                    {
                        if (att.AppUserId == user.Id.ToString())
                            result.Add(space);
                    }
                }

                var projectToReturn = mapper.Map<List<ProjectProfile>>(result);

                return Result<List<ProjectProfile>>.Success(projectToReturn);
            }

        }
    }
}
