import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    baseUrl =environment.baseUrl;
  constructor(private http:HttpClient) { }

  getMovies(){
  return this.http.get<Movie[]>(`${this.baseUrl}movies-popular`);
}
}

