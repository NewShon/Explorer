using System.Threading.Tasks;
using AutoMapper;
using Explorer.BLL.Dto.Content.Files;
using Explorer.BLL.Interfaces;
using Explorer.ViewModels.Content.Files;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IContentService _contentService;
        private readonly IMapper _mapper;
        public FileController(IContentService contentService, IMapper mapper)
        {
            _contentService = contentService;
            _mapper = mapper;
        }

        [HttpGet("{FilePath}/{FileName}")]
        [Authorize]
        public IActionResult DownloadFile([FromRoute]DownloadFileViewModel model)
        {
            try
            {
                var fileModel = _mapper.Map<DownloadFileViewModel, DownloadFileDto>(model);
                var fileType = _contentService.GetFileType(fileModel);
                return PhysicalFile(model.FilePath, fileType, model.FileName);
            }
            catch { return BadRequest(); }
        }


        [HttpPost("{FilePath}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UploadFile([FromRoute] UploadFileViewModel model)
        {
            try
            {
                var fileModel = _mapper.Map<UploadFileViewModel, UploadFileDto>(model);
                await _contentService.UploadFileAsync(fileModel);
                return Ok();
            }
            catch { return BadRequest(); }
        }
    }
}
