using Application.Core;
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
    public class OtherParticipants
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
                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUserName());

                var project = await context.Projects.Include(b => b.ProjectAttendees).Where(x => x.Id.ToString() == request.ProjectId).FirstOrDefaultAsync();

                var users2 = await context.AppUsers.ToListAsync();

                List<AppUser> usersToReturn = new List<AppUser>();

                foreach (var item in users2)
                {
                    bool isIn = false;
                    foreach (var item2 in project.ProjectAttendees)
                    {
                        if (item2.AppUserId == item.Id)
                        {
                            isIn = true;
                        }
                    }
                    if (!isIn)
                    {
                        usersToReturn.Add(item);
                    }
                    isIn = false;
                }

                var temp2 = usersToReturn.ToArray();


                var projectToReturn = mapper.Map<List<AppUserProfile>>(usersToReturn);

                return Result<List<AppUserProfile>>.Success(projectToReturn);
            }

        }
    }
}
