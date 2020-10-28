using System.Collections.Generic;

namespace Explorer.BLL.Dto.Accounts
{
    public class AuthorizationResultDto
    {
        public bool IsSuccessful { get; set; }

        public string Token { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public List<string> Errors { get; set; } = new List<string>();

    }
}

