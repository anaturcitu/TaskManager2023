using System.ComponentModel.DataAnnotations;

namespace WebAppProject.Models.Authentication.Login
{
    public class ResetPassword
    {
        [Required]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The confirmation password do not match!")]
        public string ConfirmPassword { get; set; }
        public string Email { get; set;}
        public string Token { get; set;}
    }
}
