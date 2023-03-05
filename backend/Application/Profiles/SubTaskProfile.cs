using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class SubTaskProfile
    {
        public string Id { get; set; }

        public string Description { get; set; }

        public bool IsDone { get; set; }

        public Guid WorkTaskId { get; set; }
    }
}
