using AutoMapper;
using Explorer.BLL.Dto.Content;
using Explorer.BLL.Interfaces;
using Explorer.ViewModels.Content.Folders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices.WindowsRuntime;

namespace Explorer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly IContentService _contentService;
        private readonly IMapper _mapper;
        public FolderController(IContentService contentService, IMapper mapper)
        {
            _contentService = contentService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<FolderViewModel> GetFolderContent()
        {
            try
            {
                var contentModel = _contentService.GetContent(null);
                var content = _mapper.Map<ContentDto, FolderViewModel>(contentModel);

                return Ok(content);
            }
            catch { return BadRequest(); }
        }

        [HttpGet("{folderPath}")]
        [Authorize]
        public ActionResult<FolderViewModel> GetFolderContent([FromRoute] GetFolderContentViewModel model)
        {
            try
            {
                var contentModel = _contentService.GetContent(model.FolderPath);
                var content = _mapper.Map<ContentDto, FolderViewModel>(contentModel);

                return Ok(content);
            }
            catch { return BadRequest(); }
        }

        [HttpPost("CreateFolder")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public ActionResult CreateFolder([FromBody] CreateFolderContentViewModel model)
        {
            try
            {
                _contentService.CreateFolder(model.FolderPath);
                return Ok();
            }
            catch { return BadRequest(); }
        }

        [HttpPost("RenameFolder")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public ActionResult RenameFolder([FromBody] RenameFolderContentViewModel model)
        {
            try
            {
                _contentService.RenameFolder(model.LastPath, model.NewPath);
                return Ok();
            }
            catch { return BadRequest(); }
        }

        [HttpDelete]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public ActionResult DeleteFolder([FromBody] DeleteFolderContentViewModel model)
        {
            try
            {
                _contentService.DeleteFolder(model.FolderPath);
                return Ok();
            }
            catch { return BadRequest(); }
        }
    }
}
