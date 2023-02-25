

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public ICollection<SubProject> SubProjects { get; set; } = new List<SubProject>();
        public ICollection<ProjectAttendee> ProjectAttendees { get; set; } = new List<ProjectAttendee>();
    }
}
