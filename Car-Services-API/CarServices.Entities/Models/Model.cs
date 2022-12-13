using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class Model
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }  
    }
}
