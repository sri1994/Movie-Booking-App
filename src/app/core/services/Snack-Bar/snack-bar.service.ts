import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) {}

  openSnack(message, css) {
    this.matSnackBar.dismiss();
    this.matSnackBar.open(message, ' ', {
      panelClass: css,
      verticalPosition: 'top',
      duration: 5000
    });
  }

  error(message) {
    this.openSnack(message, 'error-color');
  }

  success(message) {
    this.openSnack(message, 'success-color');
  }
}
