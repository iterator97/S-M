using Application.DTO;
using Application.Projects;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        [HttpGet()]
        public async Task<ActionResult> GetUserProject()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost()]
        public async Task<ActionResult> CreateNewProject(CreateProjectDto newProject)
        {
            return HandleResult(await Mediator.Send(new Create.Command() { NewProject = newProject }));
        }
    }
}
