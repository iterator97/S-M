namespace Domain
{
    public class WorkTaskDependency
    {
        public Guid Id { get; set; }

        public Guid WorkTaskId { get; set; }
        public WorkTask WorkTask { get; set; }

        public string DependencyId { get; set; }
    }
}
