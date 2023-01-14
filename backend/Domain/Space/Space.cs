using Domain.Spaces;

namespace Domain
{
    public class Space
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<SubSpace> SubSpaces { get; set; } = new List<SubSpace>();
    }
}
