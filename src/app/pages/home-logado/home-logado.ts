import { Component } from '@angular/core';
import { GameSearchComponent } from "../../components/game-search/game-search";
import { CarroselComponent } from "../../components/carrosel/carrosel";

@Component({
  selector: 'app-home-logado',
  imports: [GameSearchComponent, CarroselComponent],
  templateUrl: './home-logado.html',
  styleUrl: './home-logado.css'
})
export class HomeLogado {

}
