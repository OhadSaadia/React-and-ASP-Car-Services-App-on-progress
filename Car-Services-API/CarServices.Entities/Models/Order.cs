using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int TotalPrice { get; set; }

        [Required]
        public int AllreadyPaid{ get; set; }


        public virtual ApplicationUser User { get; set; }
    }
}
