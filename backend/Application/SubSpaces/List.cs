
using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using Application.Spaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;



namespace Application.SubSpaces
{
    public class List
    {
        public class Query : IRequest<Result<List<WorkTaskProfile>>>
        {
            public Guid SubSpaceId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<WorkTaskProfile>>>
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

            public async Task<Result<List<WorkTaskProfile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var subSpaceTasks = await context.WorkTasks
                    .Where(a => a.SubSpaceId == request.SubSpaceId)
                    .ProjectTo<WorkTaskProfile>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<WorkTaskProfile>>.Success(subSpaceTasks);
            }
        }
    }
}
