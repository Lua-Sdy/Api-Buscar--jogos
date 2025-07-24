import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../service/notification.service';
import { Lgpd } from '../../pages/lgpd/lgpd'; // Importar o componente LGPD

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [FormsModule, CommonModule, Lgpd], // Adicionar Lgpd aos imports
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.css'
})
export class CadastroForm {
  router = inject(Router);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  aceito: boolean = false; // Adicionado para o checkbox LGPD
  showLgpdModal: boolean = false; // Propriedade para controlar a visibilidade do modal

  onSubmit() {
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.notificationService.warning('Por favor, preencha todos os campos.');
      console.warn('Cadastro: Campos obrigatórios não preenchidos.');
      return;
    }

    if (this.senha.length < 8) {
      this.notificationService.warning('A senha deve ter pelo menos 8 caracteres.');
      console.warn('Cadastro: Senha muito curta.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.notificationService.error('As senhas não coincidem!');
      console.error('Cadastro: Senhas não coincidem.');
      return;
    }

    if (!this.aceito) {
      this.notificationService.warning('Você deve aceitar a política de privacidade.');
      console.warn('Cadastro: Política de privacidade não aceita.');
      return;
    }

    this.authService.register({ nome: this.nome, email: this.email, senha: this.senha }).subscribe({
      next: (response) => {
        this.notificationService.success(response.message);
        console.log('Cadastro bem-sucedido:', response.message);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        const errorMessage = error.error.message || 'Erro ao cadastrar usuário.';
        this.notificationService.error(errorMessage);
        console.error('Erro no cadastro:', error);
      }
    });
  }

  onAceiteChange(event: Event) {
    this.aceito = (event.target as HTMLInputElement).checked;
  }

  verLGPD() {
    this.openLgpdModal(); // Abre o modal LGPD
  }

  openLgpdModal() {
    this.showLgpdModal = true; // Abre o modal LGPD
  }

  closeLgpdModal() {
    this.showLgpdModal = false; // Fecha o modal LGPD
  }
}