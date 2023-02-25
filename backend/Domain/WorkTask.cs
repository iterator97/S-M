

namespace Domain
{
    public class WorkTask
    {
        public Guid Id { get; set; }
        public Guid SubProjectId { get; set; }
        public SubProject SubProject { get; set; }

        public string Content { get; set; }
        public string SubContent { get; set; }
        public Status Status { get; set; } = Status.NotDefinded;
        public string AssignWorkerId { get; set; }
        public AppUser AssignWorker { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; }
        public bool IsDoneOnTime { get; set; } = false;

        public ICollection<WorkTaskDependency> WorkTaskDependencyList { get; set; } = new List<WorkTaskDependency>();
        public ICollection<SubTask> SubTasks { get; set; } = new List<SubTask>();

    }
}
