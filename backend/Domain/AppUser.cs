
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<ProjectAttendee> Projects { get; set; }
        public ICollection<WorkTask> AssignedTasks { get; set; } = new List<WorkTask>();
    }
}
