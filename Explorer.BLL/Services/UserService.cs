using AutoMapper;
using AutoMapper.Internal;
using Explorer.BLL.Dto.Accounts;
using Explorer.BLL.Interfaces;
using Explorer.DAL.Models;
using Explorer.DAL.Models.Enums;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Explorer.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, SignInManager<User> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        public async Task<AuthorizationResultDto> CreateUserAsync(RegisterUserDto userDto)
        {
            var user = _mapper.Map<RegisterUserDto, User>(userDto);
            var result = await _userManager.CreateAsync(user, userDto.Password);

            var registrationResult = new AuthorizationResultDto();
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Role.User.ToString());
                await _signInManager.SignInAsync(user, false);

                registrationResult.IsSuccessful = true;
                registrationResult.Token = await _tokenService.GetTokenAsync(user);
                registrationResult.UserName = userDto.UserName;
                registrationResult.Email = userDto.Email;
                registrationResult.Role = Role.User.ToString();

                return registrationResult;
            }

            foreach (var error in result.Errors)
            {
                registrationResult.Errors.Add(error.Description);
            }

            return registrationResult;
        }

        public async Task<AuthorizationResultDto> EditRole(EditRoleUserDto roleDto)
        {
            var user = await _userManager.FindByNameAsync(roleDto.UserName);

            var editResult = new AuthorizationResultDto();
            if (user != null)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, userRoles);
                await _userManager.AddToRoleAsync(user, roleDto.Role);

                editResult.IsSuccessful = true;
                editResult.UserName = user.UserName;
                editResult.Role = (await _userManager.GetRolesAsync(user)).First();
            }

            return editResult;
        }

        
        public IList<RoleDto> GetRoles()
        {
            var result = _roleManager.Roles.ToList();
            return _mapper.Map<IList<IdentityRole>, IList<RoleDto>>(result);
        }

        public async Task<IList<AuthorizationResultDto>> GetUsers(string role)
        {
            var users = await _userManager.GetUsersInRoleAsync(role);

            if (users != null)
            {
                var result = _mapper.Map<IList<User>, IList<AuthorizationResultDto>>(users);
                result.ForAll(user =>
                {
                    user.IsSuccessful = true;
                    user.Role = role;
                });
                return result;
            }

            return null;
        }

        public async Task<AuthorizationResultDto> LoginAsync(LoginUserDto userDto)
        {
            var result = await _signInManager.PasswordSignInAsync(userDto.UserName, userDto.Password, false, false);

            var loginResult = new AuthorizationResultDto();
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(userDto.UserName);

                loginResult.Token = await _tokenService.GetTokenAsync(user);
                loginResult.IsSuccessful = true;
                loginResult.UserName = userDto.UserName;
                loginResult.Role = (await _userManager.GetRolesAsync(user)).First();

                return loginResult;
            }

            loginResult.Errors.Add("Invalid username or password");

            return loginResult;
        }
    }
}
