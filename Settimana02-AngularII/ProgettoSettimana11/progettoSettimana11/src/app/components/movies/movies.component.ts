import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription} from 'rxjs'
import { Movie } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  like = false
  sub!: Subscription;
  movies!: Movie[]
  constructor(private movieSrv: MoviesService) { }

  ngOnInit(): void {
    this.sub = this.movieSrv.getMovies().subscribe((movies:Movie[])=>{
      this.movies = movies
      console.log(this.movies)
    })
  }

  addToFavorites(id:number){
    this.like = !this.like
    console.log(this.like)
  }

}
