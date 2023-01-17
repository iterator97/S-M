

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

        public string AssignWorkerId { get; set; }

        public AppUser AssignWorker { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime? EndDate { get; set; }

        public bool IsDoneOnTime { get; set; }

        public ICollection<SubTask> SubTasks { get; set; } = new List<SubTask>();

    }
}
