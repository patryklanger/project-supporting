import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addLecturerInit } from '../store/lecturer.actions';
import { LecturersState } from '../store/reducers';
import { UserAccount } from './../../model/userAccount.model';
import { Lecturer } from './../models/lecturer.model';
import { LecturerUser } from './../models/lecturerUser.model';

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.scss'],
})
export class AddLecturerComponent implements OnInit {
  isUserInfoCreated = false;

  userLecturer: LecturerUser;

  user: UserAccount;

  formProgress = 0;

  lecturer: Lecturer;

  constructor(private store: Store<LecturersState>) {}

  ngOnInit(): void {}

  onUserInfo(payload: UserAccount) {
    console.log(payload);
    this.user = payload;
    this.isUserInfoCreated = true;
    this.formProgress = 50;
  }

  goBackToUserInfo() {
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }

  onLecturerInfo(payload: Lecturer) {
    this.lecturer = payload;
    this.userLecturer = {
      ...this.user,
      ...this.lecturer,
    };
    console.log(this.userLecturer);
    this.store.dispatch(addLecturerInit({ lecturer: this.userLecturer }));
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }
}
