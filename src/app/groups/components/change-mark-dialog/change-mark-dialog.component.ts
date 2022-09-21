import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GroupsActions } from '../../store/action-types';
import { GroupsState } from '../../store/reducers';
import { ChangeMarkDialogData } from './utils/change-mark-dialog-data';

@Component({
  selector: 'app-change-mark-dialog',
  templateUrl: './change-mark-dialog.component.html',
  styleUrls: ['./change-mark-dialog.component.scss'],
})
export class ChangeMarkDialogComponent implements OnInit {
  markCtrl: FormControl = new FormControl();

  constructor(
    private store: Store<GroupsState>,
    public dialogRef: MatDialogRef<ChangeMarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeMarkDialogData // private _snackBar: MatSnackBar
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }

  onDoneClick() {
    this.store.dispatch(
      GroupsActions.changeMarkInit({
        mark: this.markCtrl.value,
        studentId: this.data.studentId,
        groupId: this.data.groupId,
      })
    );
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
