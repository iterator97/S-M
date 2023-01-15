using Application.SubSpace;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SubSpaceController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult> GetSubSpaceDataById(string id)
        {
            return HandleResult(await Mediator.Send(new List.Query { SubSpaceId = new Guid(id) }));
        }
    }
}
