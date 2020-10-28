using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace Explorer.BLL.Options
{
    public class AuthOptions
    {
        public const string ISSUER = "UserServer";
        public const string AUDIENCE = "UserApplication";
        private const string KEY = "mysupersecret_secretkey!12345";
        public const int LIFETIME = 1;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
