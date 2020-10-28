using Explorer.BLL.Dto.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels
{
    public class LoginUserViewModel
    {
        [FromBody]
        public LoginUserDto Request { get; set; }
    }
}
