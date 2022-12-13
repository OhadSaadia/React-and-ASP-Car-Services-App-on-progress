using AutoMapper;
using CarServices.Entities.Models;
using CarServices.WebApi.DTO;
using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace CarServices.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepo _accountRepository;
        private readonly IMapper _mapper;

        public AccountsController(IAccountRepo accountRepository,
                                    IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }



        // Get User By Email
        [HttpGet("user")]
        public async Task<IActionResult> GetUser([FromQuery] string useremail)
        {
            var result = await _accountRepository.GetUserAsync(useremail);

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // Sign Up and return Jwt
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel userData)
            {



            ///////////////////// MOVE THE MAPPER TO THE REPO AND IMPLEMENT TE REMEMBER ME!!




            var user = _mapper.Map<ApplicationUser>(userData);
            var result = await _accountRepository.SignUpAsync(user);
            if (string.IsNullOrEmpty(result))
            {
                return NoContent();
            }
            return Ok(result);
        }

        // Sign In and return Jwt
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInModel signInModel)
        {
            var result = await _accountRepository.SignInAsync(signInModel);
            if (string.IsNullOrEmpty(result))
            {
                return NoContent();
            }
            return Ok(result);
        }

        //Validate JWT 
        [Authorize]
        [HttpGet("jwtcheck")]
        public IActionResult ValidateJwt()
        {
            return Ok();
        }
    }
}
