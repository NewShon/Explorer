using Explorer.BLL.Dto.Accounts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Explorer.BLL.Interfaces
{
    public interface IUserService
    {
        public Task<AuthorizationResultDto> CreateUserAsync(RegisterUserDto user);

        Task<AuthorizationResultDto> LoginAsync(LoginUserDto user);

        Task<IList<AuthorizationResultDto>> GetUsers(string role);

        Task<AuthorizationResultDto> EditRole(EditRoleUserDto roleDto);

        IList<RoleDto> GetRoles();

    }
}
