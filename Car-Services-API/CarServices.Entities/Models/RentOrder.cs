using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class RentOrder
    {

        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public int OrderDetailsId { get; set; }

        [Required]
        public int Days { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }
        



        public virtual OrderDetails OrderDetails { get; set; }

        public virtual Car Car { get; set; }


    }
}
