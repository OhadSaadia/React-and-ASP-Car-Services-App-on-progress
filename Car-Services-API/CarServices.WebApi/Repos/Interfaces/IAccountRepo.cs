using CarServices.Entities.Models;
using CarServices.WebApi.DTO;

namespace CarServices.WebApi.Repos.Interfaces
{
    public interface IAccountRepo
    {
        Task<ApplicationUser> GetUserAsync(string email);
        Task<string> SignInAsync(SignInModel signInModel);
        Task<string> SignUpAsync(ApplicationUser applicationUser);
    }
}