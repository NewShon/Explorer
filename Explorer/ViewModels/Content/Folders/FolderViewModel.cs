using Explorer.BLL.Dto.Content.Files;
using Explorer.BLL.Dto.Content.Folders;
using System.Collections.Generic;

namespace Explorer.ViewModels.Content.Folders
{
    public class FolderViewModel
    {
        public string Path{ get; set; }

        public IList<FolderDto> Folders { get; set; }

        public IList<FileDto> Files { get; set; }
    }
}
