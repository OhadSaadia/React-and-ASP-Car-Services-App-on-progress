using System.ComponentModel.DataAnnotations;

namespace CarServices.Entities.Models
{
    public class OrderDetails
    {

        public OrderDetails()
        {
            RentOrders = new HashSet<RentOrder>();
            SaleOrders = new HashSet<SaleOrder>();
        }

        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }


        public virtual Order Order { get; set; }
        public virtual ICollection<RentOrder> RentOrders { get; set; }
        public virtual ICollection<SaleOrder> SaleOrders { get; set; }
    }
}
