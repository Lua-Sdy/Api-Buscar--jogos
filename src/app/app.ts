import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { NotificationComponent } from "./components/notification/notification.component"; // Importar NotificationComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationComponent], // Adicionar NotificationComponent aqui
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'api-teste';
}
