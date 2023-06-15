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
       this.http.get("https://imdb-api.com/en/API/Search/k_uu540viv/"+ this.titleMovie).subscribe((movieImdb=>{
        try{
          this.movieImdb = movieImdb
        console.log(this.movieImdb.errorMessage)
        }
        catch(error){
          console.log(error)
        }
        this.http.get("https://imdb-api.com/en/API/YouTubeTrailer/k_uu540viv/"+this.movieImdb.results[0].id).subscribe((movieImdbForYT)=>{
          try{
            this.trailerMovie =movieImdbForYT
        this.trailerUrl = this.trailerMovie.videoUrl
        console.log(this.trailerUrl)
        this.trailer = this.sanitizerSrv.bypassSecurityTrustResourceUrl(this.trailerUrl);
        console.log(this.trailer)
          }
        catch(error){
          console.error(error)
        }
      })
       }))

      });
    });

  }
}
