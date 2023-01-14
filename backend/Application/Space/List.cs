using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Spaces
{
    public class List
    {
        public class Query : IRequest<Result<List<SpaceProfile>>> { }

        public class Handler : IRequestHandler<Query, Result<List<SpaceProfile>>>
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

            public async Task<Result<List<SpaceProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var spaces = await context.Spaces
                    .Include(b => b.SubSpaces)
                        .Include(c => c.Attendees)
                            .ThenInclude(d => d.AppUser)
                                .ToListAsync(cancellationToken);

                List<Space> result = new List<Space>();
                foreach (var space in spaces)
                {
                    foreach (var att in space.Attendees)
                    {
                        if (att.AppUserId == user.Id.ToString())
                            result.Add(space);
                    }
                }

                var spacesToReturn = mapper.Map<List<SpaceProfile>>(result);

                return Result<List<SpaceProfile>>.Success(spacesToReturn);
            }

        }
    }
}
