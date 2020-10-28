using FluentValidation;

namespace Explorer.ViewModels.Validators
{
    public class RegisterUserViewModelValidator : AbstractValidator<RegisterUserViewModel>
    {
        public RegisterUserViewModelValidator()
        {
            RuleFor(x => x.Request)
                .NotNull();

            RuleFor(x => x.Request.UserName)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Request.Email)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Request.Password)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Request)
                .Must(x => x.Password.Equals(x.PasswordConfirm))
                .WithMessage("Confirm password should be equals password");
        }
    }
}
