using Admin.Api.Dtos.HowTo;
using AutoMapper;
using BusinessEntities;
using DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Admin.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HowtoController : ControllerBase
    {
        private HTDbContext dbContext;
        private IMapper mapper;

        public HowtoController(HTDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpGet("get-howtos")]
        public async Task<List<HowToDto>> GetHowToList()
        {
            var howtos = dbContext.HowTos.ToList().OrderBy(x => x.Id);
            var howtosDto = mapper.Map<List<HowToDto>>(howtos);
            return howtosDto;
        }

        [HttpPost("create-howto")]
        public async Task CreateHowTo([Required, FromBody] CreateHowToDto request)
        {
            var howto = mapper.Map<HowTo>(request);
            dbContext.HowTos.Add(howto);
            dbContext.SaveChanges();
        }

        [HttpPut("update-howto")]
        public async Task UpdateHowTo([Required, FromBody] UpdateHowToDto request)
        {
            var howTo = dbContext.HowTos.Find(request.Id);
            mapper.Map(request, howTo);
            dbContext.HowTos.Update(howTo);
            dbContext.SaveChanges();
        }

        [HttpDelete("delete-howto/{id:long}")]
        public async Task DeleteHowTo([Required, FromRoute] long id)
        {
            var howto = dbContext.HowTos.First(x => x.Id == id);
            dbContext.HowTos.Remove(howto);
            dbContext.SaveChanges();
        }
    }
}
