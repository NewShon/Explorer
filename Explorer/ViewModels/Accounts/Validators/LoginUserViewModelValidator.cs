using FluentValidation;

namespace Explorer.ViewModels.Validators
{
    public class LoginUserViewModelValidator : AbstractValidator<LoginUserViewModel>
    {
        public LoginUserViewModelValidator()
        {
            RuleFor(x => x.Request.UserName)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Request.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}
