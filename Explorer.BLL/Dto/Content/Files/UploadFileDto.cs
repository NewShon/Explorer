using Microsoft.AspNetCore.Http;

namespace Explorer.BLL.Dto.Content.Files
{
    public class UploadFileDto
    {
        public string FilePath { get; set; }

        public IFormFile UploadedFile { get; set; }
    }
}
