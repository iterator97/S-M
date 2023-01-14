using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorkTask, WorkTask>();

            CreateMap<SpaceAttendee, AppUserProfile>()
             .ForMember(d => d.Id, o => o.MapFrom(s => s.AppUser.Id))
             .ForMember(d => d.Name, o => o.MapFrom(s => s.AppUser.Name))
             .ForMember(d => d.Surname, o => o.MapFrom(s => s.AppUser.Surname))
             .ForMember(d => d.Email, o => o.MapFrom(s => s.AppUser.Email))
             .ForMember(d => d.IsOwner, o => o.MapFrom(s => s.IsOwner));

            CreateMap<AppUser, AppUserProfile>()
                .ForMember(a => a.Id, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.Name, b => b.MapFrom(c => c.Name))
                .ForMember(a => a.Surname, b => b.MapFrom(c => c.Surname))
                .ForMember(a => a.Email, b => b.MapFrom(c => c.Email));

            CreateMap<SubSpace, SubSpaceProfile>()
                 .ForMember(x => x.Id, p => p.MapFrom(o => o.Id))
                 .ForMember(x => x.Name, p => p.MapFrom(o => o.Name));

            CreateMap<Space, SpaceProfile>()
                .ForMember(d => d.OwnerId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Id))
                .ForMember(d => d.OwnerName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Name))
                .ForMember(d => d.OwnerSurname, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Surname))
                .ForMember(d => d.Attendes, d => d.MapFrom(s => s.Attendees));

        }
    }
}
