using API.Services;
using Application.Dto;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager_;
        private readonly SignInManager<AppUser> signInManager_;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> _userManager, SignInManager<AppUser> _signInManager, TokenService tokenService)
        {
            userManager_ = _userManager;
            signInManager_ = _signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager_.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await signInManager_.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    Email = loginDto.Email,
                    Surname = user.Surname,
                    Token = _tokenService.CreateToken(user),
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await userManager_.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                UserName = registerDto.Name + registerDto.Surname

            };

            var result = await userManager_.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return new UserDto
                {
                    Email = registerDto.Email,
                    Surname = user.Surname,
                    Token = _tokenService.CreateToken(user),
                };
            }

            return BadRequest(result.Errors);
        }
    }
}
