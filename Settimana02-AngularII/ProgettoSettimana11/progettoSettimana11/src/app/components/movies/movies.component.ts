import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { User } from 'src/app/models/user.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  user!: User;
  cart: number[] = [];

  sub!: Subscription;
  movies!: Movie[];

  constructor(private movieSrv: MoviesService, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.sub = this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies);

    });

    this.user = this.authSrv.recuperoUserDati();
  }

  toggleCart(movieId: number): void {
    if (this.isMovieInCart(movieId)) {
      this.removeFromCart(movieId);
    } else {
      this.addToCart(movieId);
    }
  }

  isMovieInCart(movieId: number): boolean {
    const inCart = this.cart.includes(movieId);

    return inCart;
  }



  addToCart(movieId: number): void {
    if (this.user.id) {
      const favMovie = { movieId: movieId, userId: this.user.id };
      this.cart.push(movieId);
      console.log(movieId);
      this.authSrv.favourite(favMovie).subscribe(
        response => {

          console.log('Film aggiunto ai preferiti', response);
        },
        error => {

          console.error('Errore durante l\'aggiunta del film ai preferiti', error);
        }
      );
    } else {
      console.error('Pirata non definito!');
    }
  }


  removeFromCart(movieId: number): void {
    if(this.user.id){
      const index = this.cart.indexOf(movieId);
    if (index > -1) {
      this.cart.splice(index, 1);
      console.log(movieId);
      console.log(this.cart.indexOf(movieId)+1)
    }
    this.authSrv.remove(this.cart.indexOf(movieId)+2).subscribe()
    }

  }
}
