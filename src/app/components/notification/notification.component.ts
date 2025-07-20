import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="currentNotification" class="notification-box" [ngClass]="currentNotification.type">
      {{ currentNotification.message }}
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentNotification: Notification | null = null;
  private subscription!: Subscription;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.subscription = this.notificationService.getNotification().subscribe(notification => {
      this.currentNotification = notification;
      // Oculta a notificação após alguns segundos
      setTimeout(() => {
        this.currentNotification = null;
      }, 3000); // 3 segundos
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
