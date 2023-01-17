

namespace Domain
{
    public class WorkTask
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string SubContent { get; set; }

        public Status Status { get; set; } = Status.NotDefinded;

        public Guid SubSpaceId { get; set; }

        public SubSpace SubSpace { get; set; }

        public ICollection<WorkTaskDependency> WorkTaskDependencyList { get; set; } = new List<WorkTaskDependency>();

    }
}
