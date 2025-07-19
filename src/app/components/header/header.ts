import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  router = inject(Router)

  goTohome(){
    this.router.navigate(["/home-logado"])
  }
}
