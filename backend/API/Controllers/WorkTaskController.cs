﻿using API.DTO;
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
        public async Task<IActionResult> GetWorkTaskById(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkTask(WorkTask workTask)
        {
            return HandleResult(await Mediator.Send(new Create.Command { workTask = workTask }));
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
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> AddDependency(DependencyDto dependencyDto)
        {
            return Ok(await Mediator.Send(new Dependency.Command { Dependencies = dependencyDto.Dependencies, WorkTaskId = dependencyDto.WorkTaskId }));
        }

    }
}
