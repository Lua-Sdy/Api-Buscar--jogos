import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private apiKey = '081b998d5a4a43529062452bfcc3d76e';
  private apiUrl = 'https://api.rawg.io/api';

  constructor(private http: HttpClient) {}

  searchGames(query: string, ordering: string = '', page: number = 1, genre: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', query)
      .set('page', page.toString());

    if (ordering) {
      params = params.set('ordering', ordering);
    }

    if (genre) {
      params = params.set('genres', genre);
    }

    return this.http.get(`${this.apiUrl}/games`, { params });
  }

  getGameDetails(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${slug}?key=${this.apiKey}`);
  }

  getGameMovies(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${slug}/movies?key=${this.apiKey}`);
  }

  getGameStores(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${slug}/stores?key=${this.apiKey}`);
  }

  getGameSeries(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${slug}/game-series?key=${this.apiKey}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres?key=${this.apiKey}`);
  }

  getTopRatedGames(): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('ordering', '-rating')
      .set('page_size', '10');
    return this.http.get(`${this.apiUrl}/games`, { params });
  }

  getNewestGames(): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('ordering', '-released')
      .set('page_size', '10');
    return this.http.get(`${this.apiUrl}/games`, { params });
  }
}
