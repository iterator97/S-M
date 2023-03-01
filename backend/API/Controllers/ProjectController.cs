using Application.Dto.Project;
using Application.Projects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        [HttpGet()]
        public async Task<ActionResult> GetProjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProject(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query() { ProjectId = id }));
        }

        [HttpPost()]
        public async Task<ActionResult> CreateNewProject(CreateProjectDto newProject)
        {
            return HandleResult(await Mediator.Send(new Create.Command() { NewProject = newProject }));
        }

        [HttpGet("participants/{id}")]
        public async Task<ActionResult> GetOtherParticipants(string id)
        {
            return HandleResult(await Mediator.Send(new OtherParticipants.Query() { ProjectId = id }));
        }

        [HttpPost("editProject")]
        public async Task<ActionResult> EditProject(ProjectDto ProjectToEdit)
        {
            return HandleResult(await Mediator.Send(new Edit.Command() { ProjectToEdit = ProjectToEdit }));
        }
    }
}
