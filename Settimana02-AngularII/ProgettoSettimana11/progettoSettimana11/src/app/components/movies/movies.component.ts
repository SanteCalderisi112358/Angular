import { Component, OnInit } from '@angular/core';
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
  cart: number[] = [];
  favMovie!: Favorites;
  subMovies!: Subscription;
  subFavorites!: Subscription;
  movies!: Movie[];
  favorites!:Favorites[]
  constructor(private movieSrv: MoviesService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.subMovies = this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);
    });

    this.user = this.authSrv.recuperoUserDati();
    if (this.user.id) {
      console.log(this.user.id);
    this.subFavorites =  this.movieSrv.getFavorites(this.user.id).subscribe((favorites: Favorites[]) => {
      this.favorites = favorites
      console.log(favorites);
        });
    }
  }

  isMovieInCart(movieId: number): boolean {
    const inCart = this.cart.includes(movieId);

    return inCart;
  }

  addToCart(movieId: number): void {

    this.user = this.authSrv.recuperoUserDati();

    if (this.user.id) {
      this.favMovie = { movieId: movieId, userId: this.user.id };
      this.cart.push(movieId);
      console.log(movieId);
      this.movieSrv.favourite(this.favMovie).subscribe(
        (response) => {
          console.log('Film aggiunto ai preferiti', response);
        }
      )
      this.subFavorites =  this.movieSrv.getFavorites(this.user.id).subscribe((favorites: Favorites[]) => {
      this.favorites = favorites
      console.log(favorites);
        });
    }

  }

  removeFromCart(movieId: number): void {
    if (this.user.id) {
      const index = this.cart.indexOf(movieId);
      if (index > -1) {
        this.cart.splice(index, 1);
        console.log(movieId);

        this.movieSrv.getFavorites(this.user.id).subscribe((favorites: Favorites[]) => {
            const favoriteToRemove = favorites.find((favorite) => favorite.movieId === movieId);
            console.log(favoriteToRemove?.id);
            if (favoriteToRemove?.id) {
              this.authSrv.remove(favoriteToRemove?.id).subscribe(
                (response) => {
                  console.log('Film rimosso dai preferiti', response);

                }
              );
            }
          });
      }

      this.subFavorites =  this.movieSrv.getFavorites(this.user.id).subscribe((favorites: Favorites[]) => {
        this.favorites = favorites
        console.log(favorites);
          });
    }

  }
}
