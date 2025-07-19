import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lgpd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lgpd.html',
  styleUrl: './lgpd.css'
})
export class Lgpd {

  constructor(private router: Router) { }

  voltarParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
