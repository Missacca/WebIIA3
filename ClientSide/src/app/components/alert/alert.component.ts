import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>
      <p>You must input at least one field</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </div>
  `
})
export class AlertComponent {
  constructor(private dialogRef: MatDialogRef<AlertComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
