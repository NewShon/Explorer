using Explorer.BLL.Dto.Accounts;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.ViewModels
{
    public class RegisterUserViewModel
    {
       [FromBody]
        public RegisterUserDto Request { get; set; }
    }
}
