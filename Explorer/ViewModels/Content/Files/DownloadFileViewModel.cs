using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels.Content.Files
{
    public class DownloadFileViewModel
    {
        [FromRoute(Name = "FilePath")]
        public string FilePath { get; set; }

        [FromRoute(Name = "FileName")]
        public string FileName { get; set; }
    }
}
