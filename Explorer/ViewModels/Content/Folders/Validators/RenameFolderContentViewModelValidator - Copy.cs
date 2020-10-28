using FluentValidation;
using System.IO;

namespace Explorer.ViewModels.Content.Folders.Validators
{
    public class RenameFolderViewModelValidator
        : AbstractValidator<RenameFolderContentViewModel>
    {
        public RenameFolderViewModelValidator()
        {
            RuleFor(x => x.NewPath)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.NewPath)
               .Must(x => { return !Directory.Exists(x); })
               .WithMessage(x => $"Folder path: {x.NewPath} already exists.");

            RuleFor(x => x.LastPath)
                .NotNull()
                .NotEmpty();
        }
    }
}
