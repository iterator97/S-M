using Application.Dto;
using Application.WorkTasks;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WorkTaskController : BaseApiController
    {
        //// Done
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetWorkTaskById(Guid id)
        //{
        //    return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        //}


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
