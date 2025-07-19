
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RawgService } from '../../service/rawg';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.html',
  styleUrls: ['./game-details.css']
})
export class GameDetailsComponent implements OnInit {
  game$: Observable<any> | undefined;
 router = inject(Router);

  onTogames(){
    this.router.navigate(['/home-logado'])
  }

  constructor(
    private route: ActivatedRoute,
    private rawgService: RawgService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.game$ = this.rawgService.getGameDetails(slug);
    }
  }

  getPCRequirements(game: any): { minimum: string, recommended: string } | null {
    const platform = game.platforms.find((p: any) => p.platform.slug === 'pc');
    return platform?.requirements || null;
  }
}
