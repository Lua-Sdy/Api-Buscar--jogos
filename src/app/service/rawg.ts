import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private apiKey = '081b998d5a4a43529062452bfcc3d76e';
  private apiUrl = 'https://api.rawg.io/api';

  constructor(private http: HttpClient) {}

  searchGames(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games?key=${this.apiKey}&search=${query}`);
  }

  getGameDetails(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/games/${slug}?key=${this.apiKey}`);
  }
}
