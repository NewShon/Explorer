using FluentValidation;

namespace Explorer.ViewModels.Content.Files.Validators
{
    public class UploadFileViewModelValidator
        : AbstractValidator<UploadFileViewModel>
    {
        public UploadFileViewModelValidator()
        {
            RuleFor(x => x.FilePath)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.UploadedFile)
                .NotNull();
        }
    }
}
