using Microsoft.AspNetCore.Mvc;
using Application.SubSpaces;

namespace API.Controllers
{
    public class SubProjectController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubProjectData(string id)
        {
            return HandleResult(await Mediator.Send(new List.Query { SubSpaceId = id }));

        }

        //[HttpGet("users/{id}")]
        //public async Task<IActionResult> GetSubSpaceUsers(string id)
        //{
        //    return HandleResult(await Mediator.Send(new UsersList.Query { SubSpaceId = id }));
        //}
    }
}
