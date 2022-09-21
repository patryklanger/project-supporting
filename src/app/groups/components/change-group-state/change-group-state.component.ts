import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GroupState } from '../../utils/groupState.model';
import { ChangeGroupDialogData } from './utils/change-group-dialog-data';
import { FormControl } from '@angular/forms';
import { changeGroupStateInit } from './../../store/groups.actions';

@Component({
  selector: 'app-change-group-state',
  templateUrl: './change-group-state.component.html',
  styleUrls: ['./change-group-state.component.scss'],
})
export class ChangeGroupStateComponent implements OnInit {
  currentState: GroupState;

  selectKeys = Object.keys(GroupState);

  stateCtrl = new FormControl();

  constructor(
    private store: Store<GroupState>,
    public dialogRef: MatDialogRef<ChangeGroupStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangeGroupDialogData
  ) {}

  onDoneClicked() {
    this.store.dispatch(
      changeGroupStateInit({
        groupId: this.data.groupId,
        state: this.stateCtrl.value,
      })
    );
    this.dialogRef.close();
  }
  onCloseClick() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    if (this.data.isFull)
      this.selectKeys = this.selectKeys.filter(
        (key) => key != 'REG' && key != 'OPEN'
      );
    else this.selectKeys = this.selectKeys.filter((key) => key != 'FULL');
    this.stateCtrl.setValue(this.data.currentState);
  }
}
