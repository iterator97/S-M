using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Users
    {
        public class Query : IRequest<Result<List<AppUserProfile>>>
        {
            public string ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<AppUserProfile>>>
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

            public async Task<Result<List<AppUserProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var projects = await context.Projects
                    .Include(b => b.SubProjects)
                        .Include(c => c.ProjectAttendees)
                            .ThenInclude(d => d.AppUser)
                              .Where(x => x.Id.ToString() == request.ProjectId).FirstOrDefaultAsync();

                return Result<List<AppUserProfile>>.Success(mapper.Map<List<AppUserProfile>>(projects.ProjectAttendees));

            }

        }
    }
}
