using FluentValidation;
using System.IO;

namespace Explorer.ViewModels.Content.Folders.Validators
{
    public class GetFolderContentViewModelValidator
        : AbstractValidator<GetFolderContentViewModel>
    {
        public GetFolderContentViewModelValidator()
        {
            RuleFor(x => x.FolderPath)
                .NotNull()
                .NotEmpty()
                .Must(x => { return Directory.Exists(x); })
                .WithMessage(x => $"Folder path: {x.FolderPath} doesn't exist.");
        }
    }
}
