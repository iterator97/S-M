
using Application.Dto.Attndee;

namespace Application.Dto.Project
{
    public class ProjectDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string OwnerId { get; set; }
        public List<ProjectAttendeeDto> ProjectAttendees { get; set; }
    }
}
