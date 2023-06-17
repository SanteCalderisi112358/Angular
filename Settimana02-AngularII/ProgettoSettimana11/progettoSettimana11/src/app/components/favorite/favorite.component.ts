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
  removed!:boolean

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
          console.log(this.favorites)
        });
      }
    });
  }
  updateFavoriteMovies(): void {
    this.listFavorite = this.favorites.map((favorite) => {
      const movie = this.movies.find((m) => m.id === favorite.movieId);
      return movie;
    }).filter((movie) => movie !== null) as Movie[];
  }



  removeFromlistFavorite(movieId: number): void {
    const favoriteToRemove = this.favorites.find((favorite) => favorite.movieId === movieId);
    if(favoriteToRemove?.id){
    this.movieSrv.removeFavoriteFromFavorites(favoriteToRemove?.id).subscribe();
    }


    this.toggleCardVisibility(movieId)
  }
  toggleCardVisibility(index: number): void {
    this.listFavorite[index].hidden = !this.listFavorite[index].hidden;
  }
  ngOnDestroy(): void {
    this.subMovies.unsubscribe();
    this.subFavorites.unsubscribe();
  }


}
