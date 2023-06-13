import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { User } from 'src/app/models/user.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favorites } from 'src/app/models/favorites.interface';
import { Genres } from 'src/app/models/genres.interface';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  user!: User;
  listFavorite: number[] = [];
  favMovie!: Favorites;
  subMovies!: Subscription;
  subFavorites!: Subscription;
  genres!: Genres[];
  movies!: Movie[];
  favorites!: Favorites[];

  constructor(private movieSrv: MoviesService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.subMovies = this.movieSrv.getAllMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);
    });

    this.user = this.authSrv.recuperoUserDati();
    if (this.user && this.user.id) {
      console.log("Utente:")
      console.log(this.user);
      this.loadFavorites();
    }

    this.getAllGenres()
  }



  addTolistFavorite(movieId: number): void {
    if (this.user && this.user.id) {
      this.favMovie = { movieId: movieId, userId: this.user.id };
      this.listFavorite.push(movieId);
      console.log(movieId);
      this.movieSrv.addFavouriteToFavorites(this.favMovie).subscribe((response) => {
          console.log('Film aggiunto ai preferiti', response);
          this.loadFavorites();
        });
    }
    this.isMovieInlistFavorite(movieId)
  }



  removeFromlistFavorite(movieId: number): void {

    if (this.user && this.user.id) {
      const index = this.listFavorite.indexOf(movieId);
      if (index > -1) {
        this.listFavorite.splice(index, 1);

        this.movieSrv.getFavoritesByUserId(this.user.id).subscribe((favorites: Favorites[]) => {
          const favoriteToRemove = favorites.find((favorite) => favorite.movieId === movieId);

          if (favoriteToRemove?.id) {
            this.movieSrv.removeFavoriteFromFavorites(favoriteToRemove?.id).subscribe();
          }
          this.loadFavorites();
        });
      }
    }
    this.isMovieInlistFavorite(movieId)
  }

  //metodo iniziale per il controllo dei button senza le condizioni del film preferito se presente o no
  // isMovieInlistFavorite(movieId: number): boolean {
  //   return this.listFavorite.includes(movieId);
  // }

  isMovieInlistFavorite(movieId: number): boolean {
    if (this.favorites && this.favorites.length > 0) {
      const foundFavorite:Favorites|undefined = this.favorites.find(
        (favorite) => favorite.movieId === movieId && favorite.userId === this.user.id
      );
      return !!foundFavorite;
    }
    return false;
  }

  loadFavorites(): void {
    if (this.user?.id) {
      this.subFavorites = this.movieSrv
        .getFavoritesByUserId(this.user.id)
        .subscribe((favorites: Favorites[]) => {
          this.favorites = favorites;
          this.listFavorite = favorites.map((favorite) => favorite.movieId);
          console.log('Lista film preferiti aggiornati')
          console.log(favorites);
        });
    }
  }
  selectedGenre(e: Event) {
    const selectedGenreId = Number((<HTMLSelectElement>e.target).value);
    console.log('Id del genere:', selectedGenreId);

    this.movieSrv.getAllMovies().subscribe((movies) => {
      this.movies = movies.filter(movie => movie.genre_ids.includes(selectedGenreId));

      if (this.movies.length === 0) {
        console.log('Nessun film corrispondente al genere selezionato');
      } else {
        console.log('Lista film del genere selezionato:', this.movies);
      }
    });
  }



  getAllGenres(){
    this.movieSrv.getGenres().subscribe((_genres:Genres[])=>{
      this.genres = _genres
      console.log(_genres)
    })
  }
}
