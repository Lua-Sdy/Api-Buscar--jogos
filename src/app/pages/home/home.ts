import { Component, inject } from '@angular/core';
import { CarroselComponent } from '../../components/carrosel/carrosel';
import { Header } from "../../components/header/header";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarroselComponent, Header],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  router = inject(Router)

  onTologin() {
    this.router.navigate(["/login"])
  }
  onTocadastro() {
    this.router.navigate(["/cadastro"])
  }
   onTosobre(){
    this.router.navigate(['/sobre'])
  }
}
