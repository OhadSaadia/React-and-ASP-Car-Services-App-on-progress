using CarServices.WebApi.Repos.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarServices.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {
        private readonly IModelRepo _modelRepo;

        public ModelsController(IModelRepo modelRepo)
        {
            _modelRepo = modelRepo;
        }
    
    }
}
