using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebAppProject.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AdminController(UserManager<IdentityUser> usermanager)
        {
            _userManager = usermanager;
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var chechUser = await _userManager.FindByEmailAsync(email);
            if (chechUser == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                   new Models.Response.Response { Status = "Error", Message = "User doesn't exist!" });
            }
            else
            {
                var result = await _userManager.DeleteAsync(chechUser);
                return StatusCode(StatusCodes.Status200OK,
                   new Models.Response.Response { Status = "Succes", Message = "User deleted!" });
            }
        }
        // GetUsers (Metoda care ne ia toti utilizatorii din baza de date)
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }
    }

}
