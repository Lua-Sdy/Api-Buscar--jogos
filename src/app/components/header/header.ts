import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  isLoggedIn = false;
  username: string | null = null;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onTologin(){
    this.router.navigate(['/login']);
  }

  onTocadastro(){
    this.router.navigate(['/cadastro']);
  }
  onTosobre(){
    this.router.navigate(['/sobre'])
  }
  onTogeneros(){
    this.router.navigate(['/genres'])
  }
}
