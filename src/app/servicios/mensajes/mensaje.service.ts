import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable()

export class MensajeService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string = 'Ok') {
        this.snackBar.open(message, action, {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

}
