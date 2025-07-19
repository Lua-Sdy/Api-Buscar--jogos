import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-from',
  imports: [],
  templateUrl: './login-from.html',
  styleUrl: './login-from.css'
})
export class LoginFrom {
  router = inject(Router);

  onTogames(){
    this.router.navigate(['/home-logado'])
  }


}
