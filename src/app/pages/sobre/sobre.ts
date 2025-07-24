import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class SobreComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onBack() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home-logado']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
