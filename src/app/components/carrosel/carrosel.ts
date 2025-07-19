import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RawgService } from '../../service/rawg';

declare var bootstrap: any; // Declara a variável global do Bootstrap

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrosel.html',
  styleUrls: ['./carrosel.css']
})
export class CarroselComponent implements OnInit, AfterViewInit {
  @ViewChild('gameCarousel') carouselElement!: ElementRef;
  games: any[] = [];
  private carouselInstance: any;

  constructor(private rawgService: RawgService) {}

  ngOnInit(): void {
    this.loadLatestGames();
  }

  ngAfterViewInit(): void {
    // Inicializa o carrossel do Bootstrap manualmente
    if (this.carouselElement) {
      this.carouselInstance = new bootstrap.Carousel(this.carouselElement.nativeElement, {
        ride: 'carousel'
      });
    }
  }

  loadLatestGames() {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    this.rawgService.searchGames('', '-added', randomPage).subscribe({
      next: (data) => {
        this.games = data.results.slice(0, 5);
        // Reinicia o carrossel quando os dados chegam para garantir que ele funcione
        setTimeout(() => {
          if (this.carouselElement) {
            this.carouselInstance = new bootstrap.Carousel(this.carouselElement.nativeElement, {
              ride: 'carousel'
            });
          }
        }, 0);
      },
      error: (error) => {
        console.error('Erro ao carregar jogos recentes:', error);
      }
    });
  }
}