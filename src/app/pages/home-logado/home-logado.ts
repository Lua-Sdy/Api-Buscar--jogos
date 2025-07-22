import { Component, OnInit } from '@angular/core';
import { GameSearchComponent } from "../../components/game-search/game-search";
import { CarroselComponent } from "../../components/carrosel/carrosel";
import { Header } from "../../components/header/header";
import { RawgService } from '../../service/rawg';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-logado',
  imports: [CarroselComponent, Header, CommonModule, RouterLink],
  templateUrl: './home-logado.html',
  styleUrl: './home-logado.css'
})
export class HomeLogado implements OnInit {
  topRatedGames: any[] = [];
  newestGames: any[] = [];
  topRatedGamesChunks: any[] = [];
  newestGamesChunks: any[] = [];

  constructor(private rawgService: RawgService) {}

  ngOnInit() {
    this.rawgService.getTopRatedGames().subscribe((data: any) => {
      this.topRatedGames = data.results;
      this.topRatedGamesChunks = this.chunk(this.topRatedGames, 3);
    });

    this.rawgService.getNewestGames().subscribe((data: any) => {
      this.newestGames = data.results.filter((game: any) => game.background_image);
      this.newestGamesChunks = this.chunk(this.newestGames, 3);
    });
  }

  chunk(arr: any[], size: number) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
}
