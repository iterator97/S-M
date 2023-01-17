namespace Application.DTO
{
    public class CreateWorkTaskDto
    {
        public string Content { get; set; }

        public string SubContent { get; set; }

        public Guid SubSpaceId { get; set; }

        public List<CreateSubTaskDto> SubTasks { get; set; }
    }
}
