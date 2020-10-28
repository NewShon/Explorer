using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels.Content.Folders
{
    public class GetFolderContentViewModel
    {
        [FromRoute(Name = "folderPath")]
        public string FolderPath { get; set; }
    }
}
