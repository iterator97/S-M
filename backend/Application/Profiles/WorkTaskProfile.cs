using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class WorkTaskProfile
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string SubContent { get; set; }

        public Status Status { get; set; }

        public Guid SubSpaceId { get; set; }

        public string AssignWorkerId { get; set; }
        public AppUserProfile AssignWorker { get; set; }

        public List<SubTaskProfile> SubTasks { get; set; }

        public string label { get; set; }
        public string value { get; set; }
    }
}
