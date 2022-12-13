using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class CarPic
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }
        
        [Required]
        public byte[] Pic { get; set; }


        public virtual Car Car { get; set; }



    }
}
