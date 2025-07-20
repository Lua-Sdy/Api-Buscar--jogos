import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RawgService } from '../../service/rawg';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.html',
  styleUrls: ['./game-search.css'],
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true
})
export class GameSearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  results: any[] = [];
  isLoading = false;
  showNoResults = false;
  searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(private rawgService: RawgService) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400), // Espera 400ms após o usuário parar de digitar
      distinctUntilChanged(), // Só faz a busca se o texto mudou
      switchMap(query => {
        if (!query.trim()) {
          this.results = [];
          this.showNoResults = false;
          return of({ results: [] }); // Retorna um observable vazio
        }
        this.isLoading = true;
        this.showNoResults = false;
        return this.rawgService.searchGames(query).pipe(
          catchError(err => {
            console.error('Erro ao buscar jogos:', err);
            this.isLoading = false;
            this.showNoResults = true; // Mostra a mensagem de erro/sem resultados
            return of({ results: [] }); // Retorna um observable vazio em caso de erro
          })
        );
      })
    ).subscribe((data: any) => {
      this.isLoading = false;
      this.results = data.results || [];
      this.showNoResults = this.results.length === 0 && this.searchQuery.trim().length > 0;
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
