import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.interface';
import { User } from 'src/app/models/user.interface';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  user!: User;
  cart: number[] = []

  sub!: Subscription
  movies!: Movie[]

  constructor(private movieSrv: MoviesService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.sub = this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(this.movies)
      console.log(this.user.id)
    });

    this.user = this.authSrv.recuperoUserDati();
  }

  isMovieInCart(movieId: number): boolean {
    const inCart = this.cart.includes(movieId);

    return inCart;
  }

  toggleCart(movieId: number): void {
    if (this.isMovieInCart(movieId)) {
      this.removeFromCart(movieId);
    } else {
      this.addToCart(movieId);
    }
  }

  addToCart(movieId: number,): void {
    this.cart.push(movieId);
    console.log(movieId)
  }

  removeFromCart(movieId: number): void {
    const index = this.cart.indexOf(movieId);
    if (index > -1) {
      this.cart.splice(index, 1);
      console.log(movieId)
    }
  }
}
