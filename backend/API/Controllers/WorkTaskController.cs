using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;

namespace API.Controllers
{
    public class WorkTaskController : BaseApiController
    {
        public readonly DataContext context;

        public WorkTaskController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<WorkTask>>> GetWorkTasksByUser()
        {
            return await context.WorkTasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkTask>> GetWorkTaskById(string id)
        {
            return await context.WorkTasks.FindAsync(id);
        }

    }
}
