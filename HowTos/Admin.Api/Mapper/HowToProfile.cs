using Admin.Api.Dtos.HowTo;
using AutoMapper;
using BusinessEntities;

namespace Admin.Api.Mapper
{
    public class HowToProfile : Profile
    {
        public HowToProfile()
        {
            CreateMap<HowTo, HowToDto>();
            CreateMap<CreateHowToDto, HowTo>()
               .ForMember(x => x.Date, o => o.MapFrom(y => new DateTime(y.RawDate.Year, y.RawDate.Month, y.RawDate.Day, y.RawDate.Hours, y.RawDate.Minutes, 0)));
            CreateMap<UpdateHowToDto, HowTo>();
        }

    }
}
