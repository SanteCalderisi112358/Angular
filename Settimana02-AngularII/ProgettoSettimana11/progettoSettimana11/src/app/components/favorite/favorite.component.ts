import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { User } from 'src/app/models/user.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favorites } from 'src/app/models/favorites.interface';
import { Genres } from 'src/app/models/genres.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  user!: User;
  listFavorite: any[] = [];
  subMovies!: Subscription;
  subFavorites!: Subscription;
  movies!: Movie[];
  favorites!: Favorites[];


  constructor(private movieSrv: MoviesService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.user = this.authSrv.getUserData();

    this.subMovies = this.movieSrv.getAllMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);

      if (this.user.id) {
        this.subFavorites = this.movieSrv.getFavoritesByUserId(this.user.id).subscribe((favorites: Favorites[]) => {
          this.favorites = favorites;
          this.updateFavoriteMovies();

        });
      }
    });
  }
  updateFavoriteMovies(): void {
    this.listFavorite = this.favorites.map((favorite) => {
      const movie = this.movies.find((m) => m.id === favorite.movieId);
      return movie ? movie : null;
    }).filter((movie) => movie !== null) as Movie[];
  }

  ngOnDestroy(): void {
    this.subMovies.unsubscribe();
    this.subFavorites.unsubscribe();
  }


}
