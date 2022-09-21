import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Meeting } from 'src/app/model/meeting.model';
import { GroupState } from '../../utils/groupState.model';
import { MeetingDialogData } from './utils/MeetingDialogData';
import { Presence } from './../../../model/presence.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CheckboxData } from './utils/CheckboxData';
import { PresenceChangeRequest } from './../../model/presenceChangeRequest';
import { GroupsActions } from '../../store/action-types';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss'],
})
export class MeetingDialogComponent implements OnInit {
  meeting: Meeting;
  presenceList: CheckboxData[];

  constructor(
    private store: Store<GroupState>,
    public dialogRef: MatDialogRef<MeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MeetingDialogData // private _snackBar: MatSnackBar
  ) {
    this.meeting = this.data.meeting;
    this.presenceList = this.data.meeting.presenceList.map((el) => {
      return {
        presenceId: el.id,
        wasPresent: el.wasPresent,
        studentName: el.student.firstName + ' ' + el.student.lastName,
      };
    });
  }
  presenceChanged(state: MatCheckboxChange, presenceId: number) {
    const presenceIndex = this.presenceList.findIndex(
      (pres) => pres.presenceId == presenceId
    );
    this.presenceList[presenceIndex].wasPresent = state.checked;
  }

  onClickDone() {
    const result: PresenceChangeRequest[] = this.presenceList.map(
      (presence) => {
        return {
          presenceId: presence.presenceId,
          wasPresent: presence.wasPresent,
        };
      }
    );

    this.store.dispatch(
      GroupsActions.changePresenceStateInit({
        meetingId: this.data.meeting.id,
        data: result,
      })
    );
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.meeting);
  }
}
