using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarServices.Entities.Models
{
    public class Car
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public int ModelId { get; set; }

        [Required]
        public int CompanyId { get; set; }

        [Required]
        public DateTime Year { get; set; }


        public virtual Company Company { get; set; }
        public virtual Model Model { get; set; }
    }


}
