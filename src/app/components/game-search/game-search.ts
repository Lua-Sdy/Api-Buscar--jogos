import { Component, OnInit, OnDestroy } from '@angular/core';
import { RawgService } from '../../service/rawg';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Header } from "../header/header";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.html',
  styleUrls: ['./game-search.css'],
  imports: [CommonModule, RouterLink, Header],
  standalone: true
})
export class GameSearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  results: any[] = [];
  isLoading = false;
  showNoResults = false;
  private routeSubscription!: Subscription;

  constructor(
    private rawgService: RawgService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.searchQuery = params.get('query') || '';
        if (!this.searchQuery.trim()) {
          this.results = [];
          this.showNoResults = false;
          return of({ results: [] });
        }
        this.isLoading = true;
        this.showNoResults = false;
        return this.rawgService.searchGames(this.searchQuery).pipe(
          catchError(err => {
            console.error('Erro ao buscar jogos:', err);
            this.isLoading = false;
            this.showNoResults = true;
            return of({ results: [] });
          })
        );
      })
    ).subscribe((data: any) => {
      this.isLoading = false;
      this.results = data.results || [];
      this.showNoResults = this.results.length === 0 && this.searchQuery.trim().length > 0;
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
