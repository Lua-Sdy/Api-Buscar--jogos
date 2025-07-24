import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RawgService } from '../../service/rawg';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from "../../components/footer/footer";

interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './genres.html',
  styleUrls: ['./genres.css']
})
export class GenresComponent implements OnInit {
  data$: Observable<any> | undefined; // Alterado para 'data para ser mais genérico
  isGenreList: boolean = true; // Para controlar o que exibir no template

  constructor(private rawgService: RawgService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const genreSlug = params.get('slug');
      if (genreSlug) {
        this.isGenreList = false;
        this.data$ = this.rawgService.searchGames('', '', 1, genreSlug);
      } else {
        this.isGenreList = true;
        this.data$ = this.rawgService.getGenres();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}