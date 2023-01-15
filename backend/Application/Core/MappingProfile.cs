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

            CreateMap<Space, SpaceProfile>()
                .ForMember(d => d.OwnerId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Id))
                .ForMember(d => d.OwnerName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Name))
                .ForMember(d => d.OwnerSurname, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOwner).AppUser.Surname))
                .ForMember(d => d.Attendes, d => d.MapFrom(s => s.Attendees));

            CreateMap<WorkTask, WorkTaskProfile>()
                .ForMember(a => a.Id, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.Content, b => b.MapFrom(c => c.Content))
                .ForMember(a => a.SubContent, b => b.MapFrom(c => c.SubContent))
                .ForMember(a => a.Status, b => b.MapFrom(c => c.Status));

        }
    }
}
