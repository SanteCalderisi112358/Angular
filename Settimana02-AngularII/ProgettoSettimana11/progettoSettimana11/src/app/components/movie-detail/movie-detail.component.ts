import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';





@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id!: number;
  movie!: any;
  titleMovie!: string
  videoIdYT!:SafeResourceUrl
  trailer!:SafeResourceUrl
  movieYT!:any
  safeVideoUrl!:SafeResourceUrl

  constructor(private route: ActivatedRoute, private movieSrv: MoviesService, private sanitizerSrv: DomSanitizer, private http:HttpClient, private authService:AuthService) { }

  ngOnInit(): void {



    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log(this.id);
      this.movieSrv.getAllMovies().subscribe(movies => {
        this.movie = movies.find(movie => movie.id === this.id);
        this.titleMovie = this.movie.title
        console.log(this.titleMovie)
        this.movieSrv.getTrailerByTitle(this.titleMovie).subscribe(movie=>{
          this.movieYT = movie
          this.videoIdYT= this.movieYT.items[0].id.videoId
        //  console.log(this.movieYT.items[0].snippet.thumbnails)
          console.log(this.videoIdYT)
          this.safeVideoUrl = this.sanitizerSrv.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoIdYT);


        })

      });
    });

  }

  openModal(): void {
    this.authService.restore();
    const modal = document.getElementById('trailerModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }

  }

  closeModal(): void {
    this.safeVideoUrl= ''
    const modal = document.getElementById('trailerModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';


    }
  }

}
