angular.module('givka')
  .component('moviesComponent', {
    bindings: {},
    templateUrl: 'Components/Movies/movies.component.html',
    controller: ['TmdbService', 'StorageService', 'MovieDetailsFactory', class MoviesComponent {
      constructor(TmdbService, StorageService, MovieDetailsFactory) {
        this.TmdbService = TmdbService;
        this.StorageService = StorageService;
        this.MovieDetailsFactory = MovieDetailsFactory;

        this.list = 'popular';
        this.movies = [];
      }

      $onChanges() {
        this.StorageService.readDB('movie')
          .then((movies) => {
            this.movies = Object.keys(movies).map(key => movies[key]);
            this.movies = _.orderBy(this.movies, e => e.date);
          });
      }

      onClickPoster(movie) {
        this.TmdbService.getMovie(movie.id)
          .then((result) => {
            this.movieDetails = new this.MovieDetailsFactory(result);
            this.showMovieDetails = true;
          })
          .finally(() => { this.isLoading = false; });
      }
    }],

  });
