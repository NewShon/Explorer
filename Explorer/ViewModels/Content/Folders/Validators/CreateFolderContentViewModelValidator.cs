using FluentValidation;
using System.IO;

namespace Explorer.ViewModels.Content.Folders.Validators
{
    public class CreateFolderViewModelValidator
        : AbstractValidator<CreateFolderContentViewModel>
    {
        public CreateFolderViewModelValidator()
        {
            RuleFor(x => x.FolderPath)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.FolderPath)
               .Must(x => { return !Directory.Exists(x); })
               .WithMessage(x => $"Folder path: {x.FolderPath} already exists.");
        }
    }
}
