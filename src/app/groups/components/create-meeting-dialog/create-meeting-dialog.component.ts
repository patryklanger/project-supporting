import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateMeetingDialogData } from './utils/create-meeting-dialog-data';
import { MeetingService } from './../../services/meeting.service';
import { GroupsState } from 'src/app/groups/store/reducers';
import { Store } from '@ngrx/store';
import { GroupsActions } from '../../store/action-types';

@Component({
  selector: 'app-create-meeting-dialog',
  templateUrl: './create-meeting-dialog.component.html',
  styleUrls: ['./create-meeting-dialog.component.scss'],
})
export class CreateMeetingDialogComponent implements OnInit {
  dateCtrl: FormControl = new FormControl();

  timeCtrl: FormControl = new FormControl();

  now = new Date();

  constructor(
    private store: Store<GroupsState>,
    public dialogRef: MatDialogRef<CreateMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateMeetingDialogData,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.dateCtrl.valid || !this.timeCtrl.valid) {
      this._snackBar.open('Fill all necessary fields', 'OK!');
      return;
    }
    const date = new Date(this.dateCtrl.value);

    const time =
      `"` +
      date.getFullYear() +
      '-' +
      date.getMonth().toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0') +
      'T' +
      this.timeCtrl.value +
      ':00.000Z' +
      `"`;

    this.store.dispatch(
      GroupsActions.addMeetingForGroupInit({
        groupId: this.data.groupId,
        time: time,
      })
    );
    this.dialogRef.close();
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
