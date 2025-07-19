import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AuthService } from '../../service/auth'; // Importar AuthService

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionar FormsModule
  templateUrl: './cadastro-form.html',
  styleUrls: ['./cadastro-form.css']
})
export class CadastroFormComponent {
  aceito = false;
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onAceiteChange(event: any) {
    this.aceito = event.target.checked;
  }

  verLGPD() {
    this.router.navigate(['/lgpd']);
  }

  async onSubmit() {

    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (this.senha.length < 8) {
    alert('A senha deve ter pelo menos 8 caracteres.');
    return;
  }
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        alert(response.message );
        // Redirecionar para a página de login ou home após o cadastro
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert(error.error.message || 'Erro ao cadastrar usuário.');
      }
    });
  }
}
