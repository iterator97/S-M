﻿namespace API.DTO
{
    public class DependencyDto
    {
        public string WorkTaskId { get; set; }
        public List<string> Dependencies { get; set; }
    }
}
