using Application.Spaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SpaceController : BaseApiController
    {
        [HttpGet()]
        public async Task<ActionResult> GetOwnSpacesByUsserId()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}
