using CarServices.Entities.Models;
using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarServices.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;

        public OrdersController(IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var result = await _orderRepo.GetAllOrdersAsync();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetOrderByUserId([FromRoute] string userId)
        {
            var result = await _orderRepo.GetOrdersByUserAsync(userId);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddNewOrder([FromBody] Order order)
        {
            var result = await _orderRepo.AddNewOrderAsync(order);
            if (result)
            {
                return Ok(result);
            }
            return NotFound();
        }


    }
}
