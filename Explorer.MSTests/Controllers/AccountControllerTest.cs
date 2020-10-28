using Explorer.BLL.Dto.Accounts;
using Explorer.BLL.Interfaces;
using Explorer.Controllers;
using Explorer.ViewModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Explorer.MSTests.Controllers
{
    [TestClass]
    public class AccountControllerTest
    {
        private Mock<IUserService> _userService;


        public AccountControllerTest()
        {
            _userService = new Mock<IUserService>();
        }


        [TestMethod]
        public async Task Register_Method_Test_CreateUserAsync_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            var request = new RegisterUserDto();
            var model = new RegisterUserViewModel() { Request = request };
            var returnModel = new AuthorizationResultDto() { IsSuccessful = true };

            _userService.Setup(f => f.CreateUserAsync(model.Request)).ReturnsAsync(returnModel);

            var controller = new AccountController(_userService.Object);

            // Act
            var result = await controller.Register(model);

            // Assert
            Assert.IsNotNull(result);
            _userService.Verify(f => f.CreateUserAsync(request), Times.Once);
        }

        [TestMethod]
        public async Task Loginr_Method_Test_LoginAsync_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            var request = new LoginUserDto();
            var model = new LoginUserViewModel() { Request = request };
            var returnModel = new AuthorizationResultDto() { IsSuccessful = true };

            _userService.Setup(f => f.LoginAsync(model.Request)).ReturnsAsync(returnModel);

            var controller = new AccountController(_userService.Object);

            // Act
            var result = await controller.Login(model);

            // Assert
            Assert.IsNotNull(result);
            _userService.Verify(f => f.LoginAsync(request), Times.Once);
        }

        [TestMethod]
        public void GetRoles_Method_Test_GetRoles_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            var returnModel = new List<RoleDto>() { new RoleDto() };

            _userService.Setup(f => f.GetRoles()).Returns(returnModel);

            var controller = new AccountController(_userService.Object);

            // Act
            var result = controller.GetRoles();

            // Assert
            Assert.IsNotNull(result);
            _userService.Verify(f => f.GetRoles(), Times.Once);
        }

        [TestMethod]
        public async Task GetUsers_Method_Test_GetUsers_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            string role = "role";
            var returnModel = new List<AuthorizationResultDto>() { new AuthorizationResultDto() };

            _userService.Setup(f => f.GetUsers(role)).ReturnsAsync(returnModel);

            var controller = new AccountController(_userService.Object);

            // Act
            var result = await controller.GetUsers(role);

            // Assert
            Assert.IsNotNull(result);
            _userService.Verify(f => f.GetUsers(role), Times.Once);
        }

        [TestMethod]
        public async Task EditRole_Method_Test_EditRole_Call_Once_Return_Not_Null_Result()
        {
            // Arrange
            var model = new EditRoleViewModel() { Request = new EditRoleUserDto() };
            var returnModel = new AuthorizationResultDto();

            _userService.Setup(f => f.EditRole(model.Request)).ReturnsAsync(returnModel);

            var controller = new AccountController(_userService.Object);

            // Act
            var result = await controller.EditRole(model);

            // Assert
            Assert.IsNotNull(result);
            _userService.Verify(f => f.EditRole(model.Request), Times.Once);
        }
    }
}
