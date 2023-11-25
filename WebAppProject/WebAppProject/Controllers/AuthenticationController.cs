using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAppProject.Models.Authentication.Login;
using WebAppProject.Models.Authentication.SignUp;
using WebAppProject.Models.Emails;
using WebAppProject.Models.Response;
using WebAppProject.Services;

namespace WebAppProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthenticationController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailService = emailService;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterUser registerUser, string role)
        {
            var checkUser = await _userManager.FindByEmailAsync(registerUser.Email); // verificare existenta cont la acea adresa de email
            if (checkUser != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Models.Response.Response { Status = "Error", Message = "User already exists!" });
            }

            IdentityUser user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.UserName
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, role);

                //send confirmation register email
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Authentication", new { token, email = user.Email }, Request.Scheme);

                string body = $@"<html>
                                <head>
                                    <style>
                                        body {{
                                            margin: 0px;
                                            padding: 0px;
                                        }}
                                        .mail_data{{
                                            border-radius: 8px;
                                            height: 100%;
                                            width: 100%;
                                            padding: 10px;
                                        }}   
                                        h2 {{
                                            font-size: 26px;
                                            color: #00a55f;
                                            text-align: center;
                                            font-family: Rockwell;

                                        }}
                                        p {{
                                            font-size: 22px;
                                            color: black;
                                            font-family: Rockwell;
                                        }}
                                        h3 {{
                                            font-size: 23px;
                                            color:  #00a55f;
                                            font-family: Rockwell;


                                        }}
                                        a{{
                                            cursor: pointer;
                                        }}
                                    </style>
                                </head>
                                <body>
                                    <div class='mail_data'>                                
                                        <h2>Cont creat</h2>
                                        <p>Dragă {registerUser.UserName},</p>
                                        <p>Îți scriem pentru a te anunța că ți-am creat un cont pe care îl poți folosii oricând ai nevoie.</p>
                                        <p>Ultimul pas este sa va confirmati adresa de e-mail, iar pentru acest lucru trebuie sa accesati urmatorul link:<br></p>
                                        <br>
                                        <a href='{confirmationLink}'>{confirmationLink}</a>
                                        <br>
                                        <br>
                                        <p>Dacă ai întrebări sau nelămuriri suplimentare, nu ezita să ne contactezi.</p>
                                        <br>
                                        <p>Îți dorim succes pe parcursul utilizării acestei aplicații!</p>
                                        <br>
                                        <br>
                                        <br>
                                        <h3>Cu stimă,<br>Task Manager</h3>                                
                                    </div>
                                </body>
                </html>";

                var message = new Message(new string[] { registerUser.Email }, "Welcome!", body, registerUser.Email);

                _emailService.SendEmail(message);

                //send register email

                return StatusCode(StatusCodes.Status201Created,
                    new Models.Response.Response { Status = "Success", Message = "User registered!" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new Models.Response.Response { Status = "Error", Message = "User failed to create!" });
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await _userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status201Created,
                    new Models.Response.Response { Status = "Success", Message = "User email confirmed!" });
                }
                else
                {
                    return StatusCode(StatusCodes.Status403Forbidden,
                    new Models.Response.Response { Status = "Error", Message = "Email confirmation error!" });
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Models.Response.Response { Status = "Error", Message = "User doesn't exist!" });
            }
        }


    
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUser loginUser)
        {
            var user = await _userManager.FindByEmailAsync(loginUser.Email);
            if(user != null && await _userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }
                // Am luat rolurile user-ului pt a crea jwt-ul.
                // Jwt-ul este folosit pt autorizare in aplicatie.

                var JwtToken = GetToken(authClaims); // revendicam token-ul in functie de ce rol avem ca sa putem fi autorizati
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(JwtToken),
                    expiration = JwtToken.ValidTo
                });
            }

            return Unauthorized();
            
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(5),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }

        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([Required] string Email)
        {
            var user = await _userManager.FindByEmailAsync(Email);
            if(user != null)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var forgotPasswordLink = Url.Action(nameof(GetResetPassToken), "Authentication", new {token, email = user.Email}, Request.Scheme);
                string body = $@"<html>
                                <head>
                                    <style>
                                        body {{
                                            margin: 0px;
                                            padding: 0px;
                                        }}
                                        .mail_data{{
                                            border-radius: 8px;
                                            height: 100%;
                                            width: 100%;
                                            padding: 10px;
                                        }}   
                                        h2 {{
                                            font-size: 26px;
                                            color: #00a55f;
                                            text-align: center;
                                            font-family: Rockwell;

                                        }}
                                        p {{
                                            font-size: 22px;
                                            color: black;
                                            font-family: Rockwell;
                                        }}
                                        h3 {{
                                            font-size: 23px;
                                            color:  #00a55f;
                                            font-family: Rockwell;


                                        }}
                                        a{{
                                            cursor: pointer;
                                        }}
                                    </style>
                                </head>
                                <body>
                                    <div class='mail_data'>                                
                                        <p>Dragă {user.UserName}</p>
                                        <p>Îți scriem pentru a te anunța că ți-am creat un link pe care te rugam sa il accesezi pentru ati reseta parola.</p>
                                        <br>
                                        <a href='{forgotPasswordLink}'>{forgotPasswordLink}</a>
                                        <br>
                                        <br>
                                        <p>Dacă ai întrebări sau nelămuriri suplimentare, nu ezita să ne contactezi.</p>
                                        <br>
                                        <p>Îți dorim succes pe parcursul utilizării acestei aplicații!</p>
                                        <br>
                                        <br>
                                        <br>
                                        <h3>Cu stimă,<br>Task Manager</h3>                                
                                    </div>
                                </body>
                </html>";

                var message = new Message(new string[] { user.Email }, "Change your password", body, user.Email);

                _emailService.SendEmail(message);
                return StatusCode(StatusCodes.Status201Created,
                new Models.Response.Response { Status = "Succes", Message = "Email was sent!" });
            }
            return StatusCode(StatusCodes.Status403Forbidden,
            new Models.Response.Response { Status = "Error", Message = "Error when sending email!" });
        }
        [HttpGet("GetResetPassToken")]
        public IActionResult GetResetPassToken(string Token, string Email)
        {
            var model = new ResetPassword { Token = Token, Email = Email };
            return Ok(model);
        }

        [HttpPost("ChangePassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ChangePassword(ResetPassword resetPassword)
        {
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);

            if (user != null)
            {
                var resetPasswordRes = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!resetPasswordRes.Succeeded)
                {
                    foreach (var error in resetPasswordRes.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);

                    }
                    return Ok(ModelState);
                }


                return StatusCode(StatusCodes.Status200OK,
                    new Models.Response.Response { Status = "Success", Message = "Password has been changed!" });
            }

            return StatusCode(StatusCodes.Status404NotFound,
                new Models.Response.Response { Status = "Error!", Message = "User not found!" });
        }
    }

}
