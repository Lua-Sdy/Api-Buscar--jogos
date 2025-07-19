import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RawgService } from '../../service/rawg';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.html',
  styleUrls: ['./game-search.css'],
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true
})
export class GameSearchComponent {
  searchQuery = '';
  results: any[] = [];

  constructor(private rawgService: RawgService) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.rawgService.searchGames(this.searchQuery).subscribe({
        next: (data: any) => {
          console.log('Resposta da API:', data);
          this.results = data.results || [];
        },
        error: (err) => {
          console.error('Erro ao buscar jogos:', err);
          alert('Erro ao buscar jogos. Verifique o console.');
        }
      });
    }
  }
}