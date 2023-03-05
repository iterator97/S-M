using Domain;

namespace Application.Profiles
{
    public class DependencyProfile
    {
        public string Id { get; set; }

        public string WorkTaskId { get; set; }

        public string WorkTaskDependencyId { get; set; }
        public string WorkTaskDependencyTitle { get; set; }
    }
}
