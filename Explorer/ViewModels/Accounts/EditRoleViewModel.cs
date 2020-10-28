using Explorer.BLL.Dto.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels
{
    public class EditRoleViewModel
    {
        [FromBody]
        public EditRoleUserDto Request { get; set; }
    }
}
