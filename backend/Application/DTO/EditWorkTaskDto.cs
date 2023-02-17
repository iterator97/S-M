

using Domain;

namespace Application.DTO
{
    public class EditWorkTaskDto
    {
        public string previousId { get; set; }

        public string Content { get; set; }

        public string SubContent { get; set; }

        public Status Status { get; set; }

        public List<string> WorkTaskDependencyList { get; set; }

        public string AssignWorkerId { get; set; }

    }
}
