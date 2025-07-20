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

  searchGames(query: string, ordering: string = '', page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('search', query)
      .set('page', page.toString());

    if (ordering) {
      params = params.set('ordering', ordering);
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
}
