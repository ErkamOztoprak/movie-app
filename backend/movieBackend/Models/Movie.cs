namespace movieBackend.Models
{
    public class Movie
    {
        public int Id {get; set;}
        public string Imdbid{get;set;}=string.Empty;
        public string Title {get; set;}=string.Empty;
        public string  Released {get;set;}=string.Empty;
        public string Rated {get;set;}=string.Empty;
        public string Genre {get;set;}=string.Empty;
        public string Director {get;set;}=string.Empty;
        public string Actors {get;set;}=string.Empty;
        public string Plot {get;set;}=string.Empty;
        public string Language {get;set;}=string.Empty;
        public string Poster {get;set;}=string.Empty;
        public string Country {get;set;}=string.Empty;
        public decimal? ImdbRating {get;set;}
        public int? Year {get;set;}
        public int? Runtime{get;set;}
        public DateTime CachedAt {get;set;}

    }
}