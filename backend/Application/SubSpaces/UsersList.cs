
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using Application.Projects;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;



namespace Application.SubSpaces
{
    public class UsersList
    {
        public class Query : IRequest<Result<List<AppUserProfile>>>
        {
            public string SubSpaceId { get; set; }
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
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var subSpaceUsers = await context.Users
                    .ProjectTo<AppUserProfile>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<AppUserProfile>>.Success(subSpaceUsers);
            }
        }
    }
}
