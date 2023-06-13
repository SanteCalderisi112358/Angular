import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.interface';
import { Favorites } from '../models/favorites.interface';
import { Genres } from '../models/genres.interface';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  removeFavoriteFromFavorites(id: number) {
    return this.http.delete(`${this.baseUrl}favorites/${id}`);
  }

  getAllMovies() {
    return this.http.get<Movie[]>(`${this.baseUrl}movies-popular`);
  }

  getFavoritesByUserId(userId: number) {
    return this.http.get<Favorites[]>(
      `${this.baseUrl}favorites?userId=${userId}`
    );
  }

  getGenres(){
    return this.http.get<Genres[]>(`${this.baseUrl}genres`)
  }
  addFavouriteToFavorites(favMovie: Favorites) {
    return this.http.post<Favorites[]>(`${this.baseUrl}favorites`, favMovie);
  }
}
