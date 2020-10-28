using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels.Content.Files
{
    public class UploadFileViewModel
    {
        [FromRoute(Name = "FilePath")]
        public string FilePath { get; set; }

        public IFormFile UploadedFile { get; set; }
}
}
