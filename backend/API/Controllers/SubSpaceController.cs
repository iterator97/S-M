using Microsoft.AspNetCore.Mvc;
using Application.SubSpaces;

namespace API.Controllers
{
    public class SubSpaceController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubSpaceData(string id)
        {
            return HandleResult(await Mediator.Send(new List.Query { SubSpaceId = id }));

        }
    }
}
