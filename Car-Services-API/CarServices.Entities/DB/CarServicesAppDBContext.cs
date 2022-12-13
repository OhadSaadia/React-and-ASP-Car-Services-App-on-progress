using CarServices.Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarServices.Entities.DB
{
    public partial class CarServicesAppDBContext : IdentityDbContext
    {
        public CarServicesAppDBContext(DbContextOptions<CarServicesAppDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CarPic>(entity =>
            {
                entity.ToTable("CarPics");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("Id");

                entity.Property(e => e.Pic)
                    .HasColumnType("image")
                    .HasColumnName("Pic");
            });


            base.OnModelCreating(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<CarDetailes> CarDetailes{ get; set; }
        public virtual DbSet<CarPic> CarPics { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Company> Companies{ get; set; }
        public virtual DbSet<Model> Models { get; set; }
        public virtual DbSet<Order> Orders{ get; set; }
        public virtual DbSet<OrderDetails> OrderDetails{ get; set; }
        public virtual DbSet<RentOrder> RentOrders{ get; set; }
        public virtual DbSet<SaleOrder> SaleOrders { get; set; }
    }
}
