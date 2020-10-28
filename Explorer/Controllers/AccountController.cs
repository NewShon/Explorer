using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Explorer.ViewModels;
using Explorer.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Explorer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserViewModel model)
        {
            var result = await _userService.CreateUserAsync(model.Request);

            if (result.IsSuccessful)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginUserViewModel model)
        {
            var result = await _userService.LoginAsync(model.Request);

            if (result.IsSuccessful)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors);
        }


        [HttpGet("GetRoles")]
        [Authorize(Roles = "SuperAdmin")]
        public IActionResult GetRoles()
        {
            var result = _userService.GetRoles();

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("GetUsers")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetUsers(string role)
        {
            var result = await _userService.GetUsers(role);

            if(result != null)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }


        [HttpPost("EditRole")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> EditRole([FromBody] EditRoleViewModel model)
        {
            var result = await _userService.EditRole(model.Request);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
