import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RawgService } from '../../service/rawg';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header implements OnInit, OnDestroy {
  router = inject(Router);
  authService = inject(AuthService);
  rawgService = inject(RawgService);

  isLoggedIn = false;
  username: string | null = null;
  searchQuery = '';
  searchResults: any[] = [];
  isLoading = false;
  searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms após o usuário parar de digitar
      distinctUntilChanged(), // Só faz a busca se o texto mudou
      switchMap(query => {
        if (!query.trim()) {
          this.searchResults = [];
          return of({ results: [] }); // Retorna um observable vazio
        }
        this.isLoading = true;
        return this.rawgService.searchGames(query).pipe(
          catchError(err => {
            console.error('Erro ao buscar jogos:', err);
            this.isLoading = false;
            this.searchResults = [];
            return of({ results: [] }); // Retorna um observable vazio em caso de erro
          })
        );
      })
    ).subscribe((data: any) => {
      this.isLoading = false;
      this.searchResults = data.results || [];
    });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearchSubmit() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search-results', this.searchQuery.trim()]);
      this.searchQuery = ''; // Limpa a barra de busca após a navegação
      this.searchResults = []; // Limpa as sugestões
    }
  }

  selectSuggestion(gameName: string) {
    this.router.navigate(['/search-results', gameName]);
    this.searchQuery = ''; // Limpa a barra de busca após a navegação
    this.searchResults = []; // Limpa as sugestões
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onTologin() {
    this.router.navigate(['/login']);
  }

  onTocadastro() {
    this.router.navigate(['/cadastro']);
  }

  onTosobre() {
    this.router.navigate(['/sobre']);
  }

  onTogeneros() {
    this.router.navigate(['/genres']);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
