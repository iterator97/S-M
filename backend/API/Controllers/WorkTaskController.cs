using Application.Dto;
using Application.Dto.WorkTask;
using Application.WorkTasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class WorkTaskController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkTaskById(string id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> ChangeStatus(ChangeStatusDto statusDto)
        {
            return HandleResult(await Mediator.Send(new WorkTaskStatus.Command { change = statusDto }));
        }

        [HttpGet("workTaskDependencies/{id}")]
        public async Task<IActionResult> GetWorkTaskDependencies(string id)
        {
            return HandleResult(await Mediator.Send(new Dependencies.Query { WorkTaskId = id }));
        }

        [HttpGet("otherDependencies/{subProjectId}/{workTaskId}")]
        public async Task<IActionResult> GetOtherDependencies(string subProjectId, string workTaskId)
        {
            return HandleResult(await Mediator.Send(new OtherDependencies.Query { SubProjectId = subProjectId, WorkTaskId = workTaskId }));
        }

        [HttpPost("addDependency/{workTaskId}/{dependencyId}")]
        public async Task<IActionResult> AddDependency(string workTaskId, string dependencyId)
        {
            return HandleResult(await Mediator.Send(new Test.Command { WorkTaskId = workTaskId, DependencyId = dependencyId }));
        }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> RemoveWorkTask(Guid id)
        //{
        //    return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        //}

        //[HttpPost]
        //public async Task<IActionResult> AddDependency(EditWorkTaskDto workTask)
        //{
        //    return HandleResult(await Mediator.Send(new Dependency.Command { workTask = workTask }));
        //}

        ////[HttpPost("editworktask")]
        ////public async Task<IActionResult> EditWorkTask(EditWorkTaskDto workTask)
        ////{
        ////    return HandleResult(await Mediator.Send(new EditTask.Command { workTask = workTask }));
        ////}

        //[HttpGet]
        //public async Task<ActionResult<List<WorkTask>>> GetWorkTaskBySubSpace(string SubSpaceId)
        //{
        //    return await Mediator.Send(new List.Query());
        //}

        //[HttpPost("create")]
        //public async Task<IActionResult> CreateWorkTask(CreateWorkTaskDto newWorkTask)
        //{
        //    return HandleResult(await Mediator.Send(new Create.Command { WorkTask = newWorkTask }));
        //}

    }
}
