using Application.WorkTasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WorkTaskController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<WorkTask>>> GetWorkTaskBySubSPace(string SubSpaceId)
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkTask>> GetWorkTaskById(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult> CreateWorkTask(WorkTask workTask)
        {
            return Ok(await Mediator.Send(new Create.Command { workTask = workTask }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditWorkTask(Guid id, WorkTask workTask)
        {
            workTask.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { workTask = workTask }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveWorkTask(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}
