using AutoMapper;
using CarServices.Entities;
using CarServices.Entities.Models;
using CarServices.WebApi.DTO;

namespace CarServices.WebApi.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<SignUpModel, ApplicationUser>()
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(src => src.Email)
                    )
                 .ForMember(
                    dest => dest.PasswordHash,
                    opt => opt.MapFrom(src => src.Password)
                    )
                 .ReverseMap();

        }
    }
}
