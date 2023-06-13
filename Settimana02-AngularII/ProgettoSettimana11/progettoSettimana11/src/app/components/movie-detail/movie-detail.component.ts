import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id!: number;
  movie!: any;
  backgroundImageUrl!: string;


  constructor(private route: ActivatedRoute, private movieSrv: MoviesService, private sanitizerSrv: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log(this.id);

      this.movieSrv.getAllMovies().subscribe(movies => {
        this.movie = movies.find(movie => movie.id === this.id);
        console.log(this.movie);
        this.backgroundImageUrl = `linear-gradient(0deg, rgba(1, 6, 0, 0.7456232492997199) 10%, rgba(13, 13, 13, 0.9781162464985994) 100%), url('http://image.tmdb.org/t/p/w500${this.movie?.poster_path}')`;

      });
    });
  }
}
