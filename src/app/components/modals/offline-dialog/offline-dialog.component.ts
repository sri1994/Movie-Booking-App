import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-offline-dialog',
  templateUrl: './offline-dialog.component.html',
  styleUrls: ['./offline-dialog.component.scss']
})
export class OfflineDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OfflineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close();
  }

}
