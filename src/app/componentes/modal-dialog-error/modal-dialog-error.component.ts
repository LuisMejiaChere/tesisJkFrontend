import { Component, Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'vex-modal-dialog-error',
  templateUrl: './modal-dialog-error.component.html',
  styleUrls: ['./modal-dialog-error.component.scss']
})
export class ModalDialodErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
}

