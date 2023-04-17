using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarServices.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepo _carRepo;

        public CarsController(ICarRepo carRepo)
        {
            _carRepo = carRepo;
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetCarDetailsById([FromRoute]int id)
        {
            var result = await _carRepo.GetCarDetailsAsync(id);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpGet("getcars/{page}")]
        public async Task<IActionResult> GetCars([FromRoute] int page)
        {
            var result = await _carRepo.GetCarsAsync(page);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpGet("getnewest/{page}")]
        public async Task<IActionResult> GetCars([FromRoute] int page)
        {
            var result = await _carRepo.GetCarsAsync(page);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

    }
}
