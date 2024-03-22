namespace Admin.Api.Dtos.HowTo
{
    public class UpdateHowToDto
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool Favorite { get; set; }
    }
}
