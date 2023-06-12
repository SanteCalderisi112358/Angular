import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { User } from 'src/app/models/user.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favorites } from 'src/app/models/favorites.interface';

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
      console.log(this.user.id);
      this.loadFavorites();
    }
  }

  isMovieInlistFavorite(movieId: number): boolean {
    return this.listFavorite.includes(movieId);
  }

  addTolistFavorite(movieId: number): void {
    if (this.user && this.user.id) {
      this.favMovie = { movieId: movieId, userId: this.user.id };
      this.listFavorite.push(movieId);
      console.log(movieId);
      this.movieSrv
        .addFavouriteToFavorites(this.favMovie)
        .subscribe((response) => {
          console.log('Film aggiunto ai preferiti', response);
          this.loadFavorites();
        });
    }
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
  }
  loadFavorites(): void {
    if (this.user?.id) {
      this.subFavorites = this.movieSrv
        .getFavoritesByUserId(this.user.id)
        .subscribe((favorites: Favorites[]) => {
          this.favorites = favorites;
          console.log('Lista film preferiti aggiornati')
          console.log(favorites);
        });
    }
  }
}
