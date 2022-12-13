using CarServices.Entities.Models;
using CarServices.WebApi.DTO;
using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarServices.WebApi.Repos
{
    public class AccountRepo : IAccountRepo
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountRepo(UserManager<ApplicationUser> userManager,
                                 SignInManager<ApplicationUser> signInManager,
                                 IConfiguration configuration)

        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        // Find User By Email
        public async Task<ApplicationUser> GetUserAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        // Sign Up and return Jwt
        public async Task<string> SignUpAsync(ApplicationUser applicationUser)
        {
            var result = await _userManager.CreateAsync(applicationUser, applicationUser.PasswordHash);
            if (!result.Succeeded)
            {
                return null;
            }
            return GetToken(applicationUser.Email);
        }

        // Sign In and return Jwt
        public async Task<string> SignInAsync(SignInModel signInModel)
        {
            var result = await _signInManager.PasswordSignInAsync(signInModel.Email, signInModel.Password, false, false);
            if (!result.Succeeded)
            {
                return null;
            }
            return GetToken(signInModel.Email);
        }

        // Generate Jwt
        private string GetToken(string email)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Name, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
           };
            var authKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: new SigningCredentials(authKey, SecurityAlgorithms.HmacSha256Signature)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
