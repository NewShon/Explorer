using AutoMapper;
using Explorer.BLL.Dto.Accounts;
using Explorer.BLL.Dto.Content;
using Explorer.BLL.Dto.Content.Files;
using Explorer.BLL.Dto.Content.Folders;
using Explorer.DAL.Models;
using Explorer.ViewModels.Content.Files;
using Explorer.ViewModels.Content.Folders;
using Microsoft.AspNetCore.Identity;
using System.IO;

namespace Explorer.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            AccountProfile();

            FilesProfile();

            FoldersProfile();
        }

        private void AccountProfile()
        {
            CreateMap<RegisterUserDto, User>().ReverseMap();

            CreateMap<User, AuthorizationResultDto>().ReverseMap();

            CreateMap<IdentityRole, RoleDto>().ReverseMap();
        }

        private void FilesProfile()
        {
            CreateMap<FileInfo, FileDto>()
                 .ForMember(
                    dest => dest.Path,
                    opt => opt.MapFrom(src => src.FullName));

            CreateMap<DownloadFileViewModel, DownloadFileDto>().ReverseMap();

            CreateMap<UploadFileViewModel, UploadFileDto>().ReverseMap();
        }

        private void FoldersProfile()
        {
            CreateMap<DirectoryInfo, FolderDto>()
                 .ForMember(
                    dest => dest.Path,
                    opt => opt.MapFrom(src => src.FullName));

            CreateMap<DriveInfo, FolderDto>()
                 .ForMember(
                    dest => dest.Path,
                    opt => opt.MapFrom(src => src.Name));

            CreateMap<ContentDto, FolderViewModel>().ReverseMap();
        }
    }
}
