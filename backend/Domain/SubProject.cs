namespace Domain
{
    public class SubProject
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        public string Name { get; set; }

        public ICollection<WorkTask> SubProjectWorkTasks { get; set; } = new List<WorkTask>();
    }
}

