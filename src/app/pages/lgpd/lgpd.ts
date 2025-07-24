import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lgpd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lgpd.html',
  styleUrl: './lgpd.css'
})
export class Lgpd {
  @Input() isVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor() { }

  closeModal() {
    this.closeModalEvent.emit();
  }
}