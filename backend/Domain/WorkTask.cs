﻿

namespace Domain
{
    public class WorkTask
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public string SubContent { get; set; }

        public Status Status { get; set; } = Status.NotDefinded;
    }
}
