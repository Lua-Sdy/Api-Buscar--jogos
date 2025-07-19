import { Component } from '@angular/core';
import { CadastroFormComponent } from "../../components/cadastro-form/cadastro-form";

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CadastroFormComponent],
  templateUrl: './cadastros.html',
  styleUrl: './cadastros.css'
})
export class Cadastros {

}
