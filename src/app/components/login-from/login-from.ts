import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AuthService } from '../../service/auth'; // Importar AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-from',
  standalone: true,
  imports: [FormsModule, CommonModule], // Adicionar FormsModule e CommonModule
  templateUrl: './login-from.html',
  styleUrl: './login-from.css'
})
export class LoginFrom {
  router = inject(Router);
  authService = inject(AuthService);

  nome: string='';
  email: string = '';
  senha: string = '';

  onSubmit() {
    this.authService.login({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
      next: (response) => {
        alert(response.message);
        localStorage.setItem('token', response.token); // Armazena o token
        this.router.navigate(['/home-logado']);
      },
      error: (error) => {
        alert(error.error.message || 'Erro ao fazer login.');
      }
    });
  }

  
}

