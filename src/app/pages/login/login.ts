import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginFrom } from "../../components/login-from/login-from";

@Component({
  selector: 'app-login',
  imports: [LoginFrom, RouterModule], // Adicionar RouterModule aqui
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {

}
