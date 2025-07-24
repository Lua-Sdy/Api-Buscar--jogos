import { Component } from '@angular/core';
import { GameDetailsComponent } from "../../components/game-details/game-details";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-detalis-games',
  imports: [GameDetailsComponent, Header, Footer],
  templateUrl: './detalis-games.html',
  styleUrl: './detalis-games.css'
})
export class DetalisGames {

}
