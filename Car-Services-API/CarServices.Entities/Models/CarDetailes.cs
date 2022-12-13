using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class CarDetailes
    {

        public CarDetailes()
        {
            CarPics = new HashSet<CarPic>();
        }

        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int CarId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int EngineCapacity { get; set; }

        [Required]
        public int HorsePower { get; set; }

        [Required]
        public double ForDayRent { get; set; }

        [Required]
        public double ForSale { get; set; }


        public virtual Category Category { get; set; }
        public virtual Car Car { get; set; }

        public virtual ICollection<CarPic> CarPics { get; set; }

    }
}
