using System.ComponentModel.DataAnnotations;

namespace CarServices.WebApi.DTO
{
    public class SignUpModel
    {
        [Key]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public bool IsRememberMe { get; set; }
    }
}
