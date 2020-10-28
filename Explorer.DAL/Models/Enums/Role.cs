using System.ComponentModel;

namespace Explorer.DAL.Models.Enums
{
    public enum Role
    {
        [Description("SuperAdmin")]
        SuperAdmin,

        [Description("Admin")]
        Admin,

        [Description("User")]
        User
    }
}
