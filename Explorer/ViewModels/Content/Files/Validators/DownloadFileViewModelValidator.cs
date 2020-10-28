using FluentValidation;

namespace Explorer.ViewModels.Content.Files.Validators
{
    public class DownloadFileViewModelValidator
        : AbstractValidator<DownloadFileViewModel>
    {
        public DownloadFileViewModelValidator()
        {
            RuleFor(x => x.FilePath)
                .NotNull()
                .NotEmpty();
        }
    }
}
