namespace Admin.Api.Dtos.HowTo
{
    public class CreateHowToDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public RawDate RawDate { get; set; }

        public bool isFavorite { get; set; }
    }
}
