namespace BusinessEntities
{
    public class HowTo
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public bool isFavorite { get; set; }
    }
}