using FluentValidation;
using System.IO;

namespace Explorer.ViewModels.Content.Folders.Validators
{
    public class DeleteFolderContentViewModelValidator
        : AbstractValidator<DeleteFolderContentViewModel>
    {
        public DeleteFolderContentViewModelValidator()
        {
            RuleFor(x => x.FolderPath)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.FolderPath)
               .Must(x => { return Directory.Exists(x); })
               .WithMessage(x => $"Folder path: {x.FolderPath} doesn't exist.");
        }
    }
}
