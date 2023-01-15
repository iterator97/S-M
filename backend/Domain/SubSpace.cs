namespace Domain
{
    public class SubSpace
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid SpaceId { get; set; }
        public Space Space { get; set; }

        public ICollection<WorkTask> SubSpaceTasks { get; set; } = new List<WorkTask>();
    }
}

