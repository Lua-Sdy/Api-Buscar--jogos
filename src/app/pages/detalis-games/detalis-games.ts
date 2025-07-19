import { Component } from '@angular/core';
import { GameDetailsComponent } from "../../components/game-details/game-details";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-detalis-games',
  imports: [GameDetailsComponent, Header],
  templateUrl: './detalis-games.html',
  styleUrl: './detalis-games.css'
})
export class DetalisGames {

}
