import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackNotificationService {

  constructor(private snack: MatSnackBar) { }

  showNotification(message: string, priority: string) {
    this.snack.open(message, 'Cerrar', { panelClass: priority, duration: 2000 })
  }
}
