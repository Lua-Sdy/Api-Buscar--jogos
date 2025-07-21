import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RawgService } from '../../service/rawg';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { GameDetails } from '../../interfaces/game-details.interface'; // Importar a interface externa


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './game-details.html',
  styleUrls: ['./game-details.css']
})
export class GameDetailsComponent implements OnInit {
  gameDetails$: Observable<GameDetails> | undefined; // Usar a interface aqui
  router = inject(Router);

  onTogames(){
    this.router.navigate(['/home-logado']);
  }

  constructor(
    private route: ActivatedRoute,
    private rawgService: RawgService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.gameDetails$ = forkJoin({
          details: this.rawgService.getGameDetails(slug),
          movies: this.rawgService.getGameMovies(slug),
          stores: this.rawgService.getGameStores(slug),
          series: this.rawgService.getGameSeries(slug)
        }).pipe(
          map(response => {
            // Mapear a resposta da API para a interface GameDetails
            const gameDetails: GameDetails = {
              ...response.details,
              movies: response.movies?.results || [],
              stores: response.stores?.results || [],
              series: response.series?.results?.filter((item: any) => item != null) || [],
              // Garantir que short_screenshots exista, mesmo que vazio
              short_screenshots: response.details.short_screenshots || [],
              // Garantir que metacritic exista, mesmo que undefined
              metacritic: response.details.metacritic || undefined,
              // Garantir que publishers, ratings, platforms, genres, tags existam
              publishers: response.details.publishers || [],
              ratings: response.details.ratings || [],
              platforms: response.details.platforms || [],
              genres: response.details.genres || [],
              tags: response.details.tags || [],
            };
            return gameDetails;
          })
        );
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  getPCRequirements(game: GameDetails): { minimum?: string, recommended?: string } | null {
    const platform = game.platforms.find((p: any) => p.platform.slug === 'pc');
    return platform?.requirements || null;
  }

  getPlatformIcon(slug: string): IconProp {
    const iconMap: { [key: string]: IconProp } = {
      pc: ['fas', 'laptop'],
      playstation: ['fab', 'playstation'],
      xbox: ['fab', 'xbox'],
      nintendo: ['fas', 'gamepad'],
      mac: ['fab', 'apple'],
      linux: ['fab', 'linux'],
      android: ['fab', 'android'],
      ios: ['fab', 'apple']
    };
    const platform = Object.keys(iconMap).find(key => slug.includes(key));
    return platform ? iconMap[platform] : ['fas', 'gamepad'];
  }
}