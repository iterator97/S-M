using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class SpaceProfile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerSurname { get; set; }
        public string OwnerEmail { get; set; }

        public ICollection<AppUserProfile> Attendes { get; set; }
        public ICollection<SubSpaceProfile> SubSpaces { get; set; }
    }
}
