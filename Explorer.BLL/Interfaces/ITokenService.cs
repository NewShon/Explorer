using Explorer.DAL.Models;
using System.Threading.Tasks;

namespace Explorer.BLL.Interfaces
{
    public interface ITokenService
    {
        Task<string> GetTokenAsync(User user);
    }
}
