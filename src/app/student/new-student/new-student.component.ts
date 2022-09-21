import { Component, OnInit } from '@angular/core';
import { StudentUser } from './../model/studentUser.model';
import { Student } from './../model/student.model';
import { StudentsState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { UserAccount } from './../../model/userAccount.model';
import { addStudentInit } from './../store/students.actions';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  isUserInfoCreated = false;

  userStudent: StudentUser;

  formProgress = 0;

  user: UserAccount;

  student: Student;

  constructor(private store: Store<StudentsState>) {}

  ngOnInit(): void {}

  onUserInfo(payload: UserAccount) {
    this.user = payload;
    this.isUserInfoCreated = true;
    this.formProgress = 50;
  }

  goBackToUserInfo() {
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }

  onStudentInfo(payload: Student) {
    this.student = payload;
    this.userStudent = {
      ...this.user,
      ...this.student,
    };
    this.store.dispatch(addStudentInit({ student: this.userStudent }));
    this.isUserInfoCreated = false;
    this.formProgress = 0;
  }
}
