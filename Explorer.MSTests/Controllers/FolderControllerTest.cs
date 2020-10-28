using AutoMapper;
using Explorer.BLL.Dto.Content;
using Explorer.BLL.Interfaces;
using Explorer.Controllers;
using Explorer.Profiles;
using Explorer.ViewModels.Content.Folders;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;

namespace Explorer.MSTests.Controllers
{
    [TestClass]
    public class FolderControllerTest
    {
        private Mock<IContentService> _contentService;
        private IMapper _mapper;


        public FolderControllerTest()
        {
            _contentService = new Mock<IContentService>();
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }


        [TestMethod]
        public void GetFolderContent_Method_Test_GetContent_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            var returnModel = new ContentDto();
            _contentService.Setup(f => f.GetContent(null)).Returns(returnModel);

            var controller = new FolderController(_contentService.Object, _mapper);

            // Act
            var result = controller.GetFolderContent();

            // Assert
            Assert.IsNotNull(result);
            _contentService.Verify(f => f.GetContent(null), Times.Once);
        }

        [TestMethod]
        public void GetFolderContent_Method_Test_GetContent_Call_Once_With_Not_Null_Parameter_Return_Not_Null_Result()
        {
            // Arrange
            var model = new GetFolderContentViewModel() { FolderPath = "test" };
            var returnModel = new ContentDto();
            _contentService.Setup(f => f.GetContent(model.FolderPath)).Returns(returnModel);

            var controller = new FolderController(_contentService.Object, _mapper);

            // Act
            var result = controller.GetFolderContent();

            // Assert
            Assert.IsNotNull(result);
            _contentService.Verify(f => f.GetContent(model.FolderPath), Times.Once);
        }
    }
}
