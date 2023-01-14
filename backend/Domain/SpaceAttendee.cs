
namespace Domain
{
    public class SpaceAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public Guid SpaceId { get; set; }
        public Space Space { get; set; }

        public bool IsOwner { get; set; }
    }
}
