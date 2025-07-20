import { Component } from '@angular/core';
import { CadastroForm } from "../../components/cadastro-form/cadastro-form"; // Corrigido o nome da importação

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CadastroForm], // Usar o nome correto aqui
  templateUrl: './cadastros.html',
  styleUrl: './cadastros.css'
})
export class Cadastros {

}