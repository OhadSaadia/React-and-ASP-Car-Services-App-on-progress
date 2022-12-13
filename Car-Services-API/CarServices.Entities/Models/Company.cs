using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class Company
    {
        public Company()
        {
            Models = new HashSet<Model>();
        }

        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    

        public virtual ICollection<Model> Models { get; set; }
    }
}
