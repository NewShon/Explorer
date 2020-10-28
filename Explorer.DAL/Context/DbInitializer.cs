using Explorer.Dal.Context;
using Explorer.DAL.Models;
using Explorer.DAL.Models.Enums;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace Explorer.DAL.Context
{
    public class DbInitializer
    {
        public static async void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationContext>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<User>>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                if (!context.Users.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole(Role.SuperAdmin.ToString()));
                    await roleManager.CreateAsync(new IdentityRole(Role.Admin.ToString()));
                    await roleManager.CreateAsync(new IdentityRole(Role.User.ToString()));

                    var superAdmin = new User { UserName = "superadmin" };
                    var superAdminResult = await userManager.CreateAsync(superAdmin, "superadmin");
                    if (superAdminResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(superAdmin, Role.SuperAdmin.ToString());
                    }

                    var admin = new User { UserName = "admin" };
                    var adminResult = await userManager.CreateAsync(admin, "admin");
                    if (adminResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(admin, Role.Admin.ToString());
                    }

                    var user = new User { UserName = "user" };
                    var userResult = await userManager.CreateAsync(user, "user1");
                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, Role.User.ToString());
                    }
                }
            }
        }
    }
}
