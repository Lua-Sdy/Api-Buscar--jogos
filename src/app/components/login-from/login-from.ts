import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../service/notification.service'; // Importar NotificationService

@Component({
  selector: 'app-login-from',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login-from.html',
  styleUrl: './login-from.css'
})
export class LoginFrom {
  router = inject(Router);
  authService = inject(AuthService);
  notificationService = inject(NotificationService); // Injetar NotificationService

  nome: string='';
  email: string = '';
  senha: string = '';

  onTocadastro() {
    this.router.navigate(["/cadastro"])
  }

  onSubmit() {
    this.authService.login({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
      next: (response) => {
        this.notificationService.success(response.message);
        console.log('Login bem-sucedido:', response.message);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.nome); // Certifique-se que o backend retorna 'nome'
        this.router.navigate(['/home-logado']);
      },
      error: (error) => {
        const errorMessage = error.error.message || 'Erro ao fazer login.';
        this.notificationService.error(errorMessage);
        console.error('Erro no login:', error);
      }
    });
  }
}