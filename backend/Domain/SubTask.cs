namespace Domain
{
    public class SubTask
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; set; }

        public Guid WorkTaskId { get; set; }

        public WorkTask WorkTask { get; set; }
    }
}
