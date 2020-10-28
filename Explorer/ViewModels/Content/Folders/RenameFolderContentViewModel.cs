using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels.Content.Folders
{
    public class RenameFolderContentViewModel
    {
        public string LastPath { get; set; }

        public string NewPath { get; set; }
    }
}
