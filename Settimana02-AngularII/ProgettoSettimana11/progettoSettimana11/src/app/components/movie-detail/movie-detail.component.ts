import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id!: number;
  movie!: any;
  movieImdb!:any
  trailerMovie!:any
  titleMovie!: string
  trailer!:SafeResourceUrl
  trailerUrl!:string

  constructor(private route: ActivatedRoute, private movieSrv: MoviesService, private sanitizerSrv: DomSanitizer, private http:HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log(this.id);

      //Ho provato a far vedere anche il trailer...il codice funziona ma Youtube non me lo permette per autorizzazioni :(
      this.movieSrv.getAllMovies().subscribe(movies => {
        this.movie = movies.find(movie => movie.id === this.id);
        this.titleMovie = this.movie.title
        console.log(this.titleMovie)


      });
    });

  }
}
