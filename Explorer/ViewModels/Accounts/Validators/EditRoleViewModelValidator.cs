using FluentValidation;

namespace Explorer.ViewModels.Validators
{
    public class EditRoleViewModelValidator : AbstractValidator<EditRoleViewModel>
    {
        public EditRoleViewModelValidator()
        {
            RuleFor(x => x.Request.UserName)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Request.Role)
                .NotNull()
                .NotEmpty();
        }
    }
}
