import { Component } from '@angular/core';
import { CarroselComponent } from '../../components/carrosel/carrosel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarroselComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

}
