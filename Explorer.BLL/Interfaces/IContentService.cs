using Explorer.BLL.Dto.Content;
using Explorer.BLL.Dto.Content.Files;
using System.Threading.Tasks;

namespace Explorer.BLL.Interfaces
{
    public interface IContentService
    {
        ContentDto GetContent(string folderPath);

        string CreateFolder(string folderPath);

        void RenameFolder(string lastPath, string newPath);

        void DeleteFolder(string folderPath);



        Task UploadFileAsync(UploadFileDto model);

        string GetFileType(DownloadFileDto filePath);
    }
}
