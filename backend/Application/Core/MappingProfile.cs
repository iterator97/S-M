using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorkTask, WorkTask>();

            CreateMap<ProjectAttendee, AppUserProfile>()
                 .ForMember(d => d.Id, o => o.MapFrom(s => s.AppUser.Id))
                 .ForMember(d => d.Name, o => o.MapFrom(s => s.AppUser.Name))
                 .ForMember(d => d.Surname, o => o.MapFrom(s => s.AppUser.Surname))
                 .ForMember(d => d.Email, o => o.MapFrom(s => s.AppUser.Email))
                 .ForMember(a => a.value, b => b.MapFrom(c => c.AppUser.Id))
                .ForMember(a => a.label, b => b.MapFrom(c => c.AppUser.Name + " " + c.AppUser.Surname))
                 .ForMember(d => d.IsOwner, o => o.MapFrom(s => s.IsOwner));

            CreateMap<AppUser, AppUserProfile>()
                .ForMember(a => a.Id, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.Name, b => b.MapFrom(c => c.Name))
                .ForMember(a => a.Surname, b => b.MapFrom(c => c.Surname))
                .ForMember(a => a.UserName, b => b.MapFrom(c => c.Name + " " + c.Surname))
                .ForMember(a => a.Email, b => b.MapFrom(c => c.Email));

            CreateMap<Project, ProjectProfile>()
                .ForMember(a => a.Id, d => d.MapFrom(s => s.Id))
                .ForMember(a => a.Name, d => d.MapFrom(s => s.Name))
                .ForMember(a => a.Description, d => d.MapFrom(s => s.Description))
                .ForMember(a => a.StartDate, d => d.MapFrom(s => s.StartDate))
                .ForMember(a => a.EndDate, d => d.MapFrom(s => s.EndDate))
                .ForMember(d => d.OwnerId, o => o.MapFrom(s => s.ProjectAttendees.FirstOrDefault(x => x.IsOwner).AppUser.Id))
                .ForMember(d => d.OwnerName, o => o.MapFrom(s => s.ProjectAttendees.FirstOrDefault(x => x.IsOwner).AppUser.Name))
                .ForMember(d => d.OwnerSurname, o => o.MapFrom(s => s.ProjectAttendees.FirstOrDefault(x => x.IsOwner).AppUser.Surname))
                .ForMember(d => d.OwnerEmail, o => o.MapFrom(s => s.ProjectAttendees.FirstOrDefault(x => x.IsOwner).AppUser.Email))
                .ForMember(d => d.Attendes, d => d.MapFrom(s => s.ProjectAttendees));

            CreateMap<SubProject, SubProjectProfile>()
                 .ForMember(x => x.Id, p => p.MapFrom(o => o.Id))
                 .ForMember(x => x.Name, p => p.MapFrom(o => o.Name));

            CreateMap<SubTask, SubTaskProfile>()
                 .ForMember(x => x.Id, p => p.MapFrom(o => o.Id))
                 .ForMember(x => x.IsDone, p => p.MapFrom(o => o.IsDone))
                 .ForMember(x => x.WorkTaskId, p => p.MapFrom(o => o.WorkTaskId))
                 .ForMember(x => x.Description, p => p.MapFrom(o => o.Description));

            CreateMap<WorkTaskDependency, DependencyProfile>()
                 .ForMember(x => x.Id, p => p.MapFrom(o => o.Id))
                 .ForMember(x => x.WorkTaskId, p => p.MapFrom(o => o.WorkTaskId))
                 .ForMember(x => x.WorkTaskDependencyId, p => p.MapFrom(o => o.WorkTaskDependencyId));

            CreateMap<WorkTask, WorkTaskProfile>()
                .ForMember(a => a.Id, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.Content, b => b.MapFrom(c => c.Content))
                .ForMember(a => a.SubContent, b => b.MapFrom(c => c.SubContent))
                .ForMember(a => a.Status, b => b.MapFrom(c => c.Status))
                .ForMember(a => a.AssignWorkerId, b => b.MapFrom(c => c.AssignWorkerId))
                .ForMember(a => a.SubTasks, b => b.MapFrom(c => c.SubTasks))
                .ForMember(a => a.label, b => b.MapFrom(c => c.Content))
                .ForMember(a => a.value, b => b.MapFrom(c => c.Id))
                .ForMember(a => a.AssignWorker, b => b.MapFrom(c => c.AssignWorker));

        }
    }
}
