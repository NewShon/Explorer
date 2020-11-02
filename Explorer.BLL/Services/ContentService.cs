using AutoMapper;
using Explorer.BLL.Dto.Content;
using Explorer.BLL.Dto.Content.Files;
using Explorer.BLL.Dto.Content.Folders;
using Explorer.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Explorer.BLL.Services
{
    public class ContentService : IContentService
    {
        private readonly IMapper _mapper;

        public ContentService(
            IMapper mapper)
        {
            _mapper = mapper;
        }

        
        
        public void DeleteFolder(string folderPath)
        {
            string[] files = Directory.GetFiles(folderPath);
            string[] dirs = Directory.GetDirectories(folderPath);

            foreach (string file in files)
            {
                File.SetAttributes(file, FileAttributes.Normal);
                File.Delete(file);
            }

            foreach (string dir in dirs)
            {
                DeleteFolder(dir);
            }

            var directoryInfo = new DirectoryInfo(folderPath);
            directoryInfo.Delete();
        }

        public string CreateFolder(string folderPath)
        {
            var directoryInfo = new DirectoryInfo(folderPath);
            directoryInfo.Create();
            return folderPath;
        }

        public void RenameFolder(string lastPath, string newPath)
        {
            Directory.Move(lastPath, newPath);
        }




        public ContentDto GetContent(string folderPath = null)
        {
            if (String.IsNullOrEmpty(folderPath))
            {
                var driversInfo = DriveInfo.GetDrives();
                var drivers = new ContentDto()
                {
                    Folders = _mapper.Map<IList<DriveInfo>, IList<FolderDto>>(driversInfo),
                    Path = folderPath
                };
                return drivers;
            }

            var directoryInfo = new DirectoryInfo(folderPath);
            var folders = directoryInfo.GetDirectories();

            var directory = new DirectoryInfo(folderPath);
            var files = directory.GetFiles();

            var content = new ContentDto()
            {
                Folders = _mapper.Map<IList<DirectoryInfo>, IList<FolderDto>>(folders),
                Files = _mapper.Map<IList<FileInfo>, IList<FileDto>>(files),
                Path = folderPath
            };

            return content;
        }




        public async Task UploadFileAsync(UploadFileDto model)
        {
            using (var fileStream = new FileStream(model.FilePath + "/" + model.UploadedFile.FileName, FileMode.Create))
            {
                await model.UploadedFile.CopyToAsync(fileStream);
            }
        }

        public string GetFileType(DownloadFileDto model)
        {
            var filePath = model.FilePath + model.FileName;
            var fileInfo = new FileInfo(filePath);
            var result = "application" + fileInfo.Extension.Replace(".", "/");
            return result;
        }
    }
}
