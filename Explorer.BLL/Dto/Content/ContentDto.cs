using Explorer.BLL.Dto.Content.Files;
using Explorer.BLL.Dto.Content.Folders;
using System.Collections.Generic;

namespace Explorer.BLL.Dto.Content
{
    public class ContentDto
    {
        public IList<FolderDto> Folders { get; set; }

        public IList<FileDto> Files { get; set; }

        public string Path { get; set; }
    }
}
